package com.intuit.player.rules.distribution

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.CliktError
import com.github.ajalt.clikt.core.ProgramResult
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.defaultLazy
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import com.github.ajalt.clikt.parameters.types.long
import io.github.gradlenexus.publishplugin.internal.BasicActionRetrier
import io.github.gradlenexus.publishplugin.internal.NexusClient
import io.github.gradlenexus.publishplugin.internal.StagingRepository
import io.github.gradlenexus.publishplugin.internal.StagingRepositoryTransitioner
import java.net.URI
import java.time.Duration

class NexusStagingCli : CliktCommand() {

    class Exception(message: String, cause: Throwable? = null) : kotlin.Exception(message, cause)

    val nexusUrl by option(help = "Nexus server URL").defaultLazy {
        "https://ossrh-staging-api.central.sonatype.com/service/local/"
    }

    val username by option(help = "Nexus server username").defaultLazy {
        System.getenv("MAVEN_USER")
    }

    val password by option(help = "Nexus server password").defaultLazy {
        System.getenv("MAVEN_PASSWORD")
    }

    val clientTimeout by option(help = "Client timeout in seconds").long()

    val connectTimeout by option(help = "Connect timeout in seconds").long()

    val packageGroup by option(help = "Package group to publish under")

    val stagingRepositoryId by option("--staging-id")

    val stagingProfileId by option("--staging-profile")

    val maxRetries by option().int().default(60)

    val delayBetween by option().long().default(10)

    val client by lazy {
        NexusClient(
            URI.create(nexusUrl),
            username,
            password,
            clientTimeout?.let(Duration::ofSeconds),
            connectTimeout?.let(Duration::ofSeconds),
        )
    }

    val retrier by lazy {
        BasicActionRetrier(
            maxRetries,
            Duration.ofSeconds(delayBetween),
            StagingRepository::transitioning
        )
    }

    val transitioner by lazy {
        StagingRepositoryTransitioner(client, retrier)
    }

    override fun run() {
        try {
            stagingRepositoryId?.let {
                // close & release
                transitioner.effectivelyClose(it, "closing from NexusStagingCli")
                transitioner.effectivelyRelease(it, "releasing from NexusStagingCli")
            } ?: run {
                val stagingProfileId = stagingProfileId
                    ?: client.findStagingProfileId(
                        packageGroup
                            ?: throw Exception("Package group is required when staging profile ID is not specified")
                    ) ?: throw Exception("Could not determine staging profile ID for $packageGroup")

                val stagingRepository =
                    client.createStagingRepository(stagingProfileId, "creating from NexusStagingCli")

                echo(stagingRepository.stagingRepositoryUrl)
            }
        } catch (e: kotlin.Exception) {
            throw CliktError(e.message, e)
        }

        // Necessary to prevent Bazel from hanging
        done()
    }

}

private fun CliktCommand.done(statusCode: Int = 0): Nothing = throw ProgramResult(statusCode)

fun main(args: Array<String>) = NexusStagingCli().main(args)
