@file:OptIn(kotlinx.validation.ExperimentalBCVApi::class)

package com.intuit.bazel.kotlin.abi

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.required
import com.github.ajalt.clikt.parameters.options.split
import com.github.ajalt.clikt.parameters.types.file
import com.github.difflib.DiffUtils
import com.github.difflib.UnifiedDiffUtils
import kotlinx.validation.api.dump
import kotlinx.validation.api.filterOutAnnotated
import kotlinx.validation.api.filterOutNonPublic
import kotlinx.validation.api.loadApiFromJvmClasses
import kotlinx.validation.api.retainExplicitlyIncludedIfDeclared
import java.util.jar.JarFile
import kotlin.system.exitProcess

private const val DIFF_CONTEXT_LINES = 3

fun main(args: Array<String>) {
    AbiCli().subcommands(DumpCommand(), CheckCommand()).main(args)
}

private class AbiCli : CliktCommand(
    name = "abi_tool",
    help = "Generate and verify Kotlin Binary Compatibility Validator .api dumps.",
) {
    override fun run() = Unit
}

private class DumpCommand : CliktCommand(
    name = "dump",
    help = "Emit a canonical BCV .api dump for the public surface of a JVM jar.",
) {
    private val jar by option("--jar", help = "Input compiled .jar to inspect.")
        .file(mustExist = true, canBeDir = false, mustBeReadable = true)
        .required()

    private val outFile by option("--out", help = "Destination .api file.")
        .file()
        .required()

    private val publicPackages by option(
        "--public-packages",
        help = "Comma-separated packages explicitly retained as public ABI.",
    ).split(",")

    private val publicClasses by option(
        "--public-classes",
        help = "Comma-separated classes explicitly retained as public ABI.",
    ).split(",")

    private val publicMarkers by option(
        "--public-markers",
        help = "Comma-separated marker annotations (JVM internal form) opting declarations into the public ABI.",
    ).split(",")

    private val nonPublicPackages by option(
        "--non-public-packages",
        help = "Comma-separated packages dropped from the public ABI.",
    ).split(",")

    private val nonPublicClasses by option(
        "--non-public-classes",
        help = "Comma-separated classes dropped from the public ABI.",
    ).split(",")

    private val nonPublicMarkers by option(
        "--non-public-markers",
        help = "Comma-separated marker annotations (JVM internal form) excluded from the public ABI.",
    ).split(",")

    override fun run() {
        val signatures = JarFile(jar).use { jarFile ->
            var sigs = jarFile.loadApiFromJvmClasses()

            val pubPkgs = publicPackages.orEmpty()
            val pubClasses = publicClasses.orEmpty()
            val pubMarkers = publicMarkers.orEmpty()
            if (pubPkgs.isNotEmpty() || pubClasses.isNotEmpty() || pubMarkers.isNotEmpty()) {
                sigs = sigs.retainExplicitlyIncludedIfDeclared(
                    publicPackages = pubPkgs,
                    publicClasses = pubClasses,
                    publicMarkerAnnotations = pubMarkers,
                )
            }

            val npPkgs = nonPublicPackages.orEmpty()
            val npClasses = nonPublicClasses.orEmpty()
            if (npPkgs.isNotEmpty() || npClasses.isNotEmpty()) {
                sigs = sigs.filterOutNonPublic(
                    nonPublicPackages = npPkgs,
                    nonPublicClasses = npClasses,
                )
            }

            val npMarkers = nonPublicMarkers.orEmpty().toSet()
            if (npMarkers.isNotEmpty()) {
                sigs = sigs.filterOutAnnotated(npMarkers)
            }

            sigs
        }

        outFile.parentFile?.mkdirs()
        outFile.bufferedWriter().use { writer -> signatures.dump(writer) }
    }
}

private class CheckCommand : CliktCommand(
    name = "check",
    help = "Compare a generated .api dump to a checked-in golden file.",
) {
    private val expected by option("--expected", help = "Checked-in golden .api file.")
        .file()
        .required()

    private val actual by option("--actual", help = "Freshly generated .api file.")
        .file(mustExist = true, canBeDir = false, mustBeReadable = true)
        .required()

    override fun run() {
        if (!expected.exists()) {
            System.err.println(
                """
                ABI check failed: expected file does not exist at ${expected.path}.
                Run the corresponding -abi-update target to create it:
                    bazel run <target>-abi-update
                """.trimIndent(),
            )
            exitProcess(1)
        }

        val expectedLines = expected.readLines()
        val actualLines = actual.readLines()
        if (expectedLines == actualLines) return

        val patch = DiffUtils.diff(expectedLines, actualLines)
        val diff = UnifiedDiffUtils.generateUnifiedDiff(
            expected.name,
            actual.name,
            expectedLines,
            patch,
            DIFF_CONTEXT_LINES,
        ).joinToString("\n")

        System.err.println(
            """
            ABI check failed.

            The public ABI of this target has changed. If the change is intentional,
            regenerate the checked-in .api file by running the corresponding -abi-update
            target:

                bazel run <target>-abi-update

            Diff (expected vs. actual):
            """.trimIndent(),
        )
        System.err.println(diff)
        exitProcess(1)
    }
}
