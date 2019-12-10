---
title: "You split me right round: optimizing split usage in Ruby"
date: "2019-12-10T16:38:00.000Z"
---

When reviewing a team member's pull request recently, I saw code like this:

```
string.split("/").first
```

[Split](https://apidock.com/ruby/String/split) is a super useful method in Ruby. It does exactly what it says on the tin; it splits strings into arrays. The first parameter is the pattern on which to split (usually a string or regular expression), and the second is the limit of split substrings. That means that `"dogs,cats,turtles".split(",", 2)` will return the array `["dogs", "cats,turtles"]`.

Since we only care about the first substring in the above code, we _can_ use this second parameter, but I wondered if we should. I decided to pull out [benchmark-ips](https://github.com/evanphx/benchmark-ips) and take a look.

If you're unfamiliar with benchmark-ips, it measure the number of times a specific piece of code will run in a second, and then compares that to other code. The first test I did was this (threw in regex just because I was curious):

```
STR = "sup/" * 5

Benchmark.ips do |x|
  x.report("split no param") { STR.split("/").first }
  x.report("split param") { STR.split("/", 2).first }
  x.report("regex") { STR.gsub(/\/.*/, "") }
  x.compare!
end
```

Which yielded these results:

```
Warming up --------------------------------------
      split no param   117.230k i/100ms
         split param   214.826k i/100ms
               regex    61.869k i/100ms
Calculating -------------------------------------
      split no param      1.569M (± 6.7%) i/s -      7.854M in   5.033527s
         split param      3.497M (± 5.7%) i/s -     17.616M in   5.054218s
               regex    713.532k (± 7.6%) i/s -      3.588M in   5.061920s

Comparison:
         split param:  3497489.0 i/s
      split no param:  1568554.7 i/s - 2.23x  slower
               regex:   713532.1 i/s - 4.90x  slower

```

Cool! So using the second parameter is about twice as fast as not using it. My guess here is that between not having to search the string further (you can see in the source that the execution is short-circuited based on `limit`), and not needing to allocate the memory for the further string objects, we're getting some good wins.

But do the performance wins scale? Or is it relatively constant? I next tried the same experiment with a much larger string:

```
STR = "sup/" * 1000

Benchmark.ips do |x|
  x.report("split no param") { STR.split("/").first }
  x.report("split param") { STR.split("/", 2).first }
  x.report("regex") { STR.gsub(/\/.*/, "") }
  x.compare!
end
```

With good results!

```
Warming up --------------------------------------
      split no param     1.438k i/100ms
         split param   192.331k i/100ms
               regex   495.000  i/100ms
Calculating -------------------------------------
      split no param     16.318k (± 5.2%) i/s -     81.966k in   5.037491s
         split param      3.263M (± 6.2%) i/s -     16.348M in   5.032953s
               regex      5.011k (± 6.0%) i/s -     25.245k in   5.057195s

Comparison:
         split param:  3262671.0 i/s
      split no param:    16317.8 i/s - 199.95x  slower
               regex:     5011.1 i/s - 651.09x  slower               
```

Now *200* times slower without this second parameter. Out of curiosity, I tried a string that is large before the first slash but without a lot of slashes:

```
STR = "#{"s" * 4000}/up/sup" 

Benchmark.ips do |x|
  x.report("split no param") { STR.split("/").first }
  x.report("split param") { STR.split("/", 2).first }
  x.report("regex") { STR.gsub(/\/.*/, "") }
  x.compare!
end
```

Which gave some interesting results:

```
Warming up --------------------------------------
      split no param    82.791k i/100ms
         split param    91.227k i/100ms
               regex    24.193k i/100ms
Calculating -------------------------------------
      split no param      1.259M (±12.3%) i/s -      6.292M in   5.081082s
         split param      1.511M (± 8.5%) i/s -      7.572M in   5.051203s
               regex    278.416k (± 7.3%) i/s -      1.403M in   5.071412s

Comparison:
         split param:  1511242.5 i/s
      split no param:  1258551.1 i/s - same-ish: difference falls within error
               regex:   278415.6 i/s - 5.43x  slower
```

Only slightly faster now! This points to performance gains coming from not having to walk the string as much in earlier examples.

It's worth noting that this is only measuring execution time, not memory consumption, where you might see some wins. Either way, passing the limit to `split` seems worthwhile if you know how many substrings you'll actually care about.

And, if anything, don't use regex for this specific problem. 
