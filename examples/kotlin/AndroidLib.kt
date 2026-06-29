package com.intuit.bazel.kotlin.android

/** A small public surface so the generated ABI `.api` has recognizable signatures. */
public class AndroidLib {
    public val greeting: String = "hello"

    public fun greet(name: String): String = "$greeting, $name"

    public fun add(a: Int, b: Int): Int = a + b
}
