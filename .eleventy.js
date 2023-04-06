// https://www.11ty.dev/docs/plugins/image/
const Image = require("@11ty/eleventy-img");
const { DateTime } = require("luxon");

async function imageShortcode(src, alt, extraClasses) {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [600],
    formats: ["png"]
  });

  let data = metadata.png[metadata.png.length - 1];
  return `<img src="${data.url}" alt="${alt}" class="${extraClasses}" loading="lazy" decoding="async">`;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.addPassthroughCopy("./src/static");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("**/*.jpg");

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addCollection("blogPosts", function(collectionApi) {
    return collectionApi.getFilteredByTag("blog").sort(function(a, b) {
      return b.date - a.date; // sort by date - descending
    });
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  }
};
