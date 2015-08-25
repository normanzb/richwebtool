http://dev.zeraweb.com/parser

When you reach the limits of regular expressions in JavaScript, you have two choices:

Realize that what you are trying to do is probably not a good idea.
Write yourself a parser and keep on going.
The addition of CSS 3 selector support in Prototype broke our regex-based parser for Behaviors. And there were so many cool things to do with them, too. So we went ahead with option 2.

What this library gives you is the ability to write parsers very easily. We don’t use the YACC-like approach of generating JavaScript code – instead we just build up a big function. It isn’t as fast as code generation, but it is faster than regex, at least for non-trivial parsers (i.e., those that you can’t do easily in regex anyway).
