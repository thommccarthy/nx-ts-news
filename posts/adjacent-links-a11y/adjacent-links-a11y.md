---
title: 'Designing for Accessibility: Eliminating the Noise from Redundant Links'
description: 'Learn how to improve the accessibility of adjacent links in elements such as product cards.'
slug: adjacent-links-a11y
meta: Learn how to improve the accessibility of adjacent links in product cards.
date: '2023-05-30 12:00:00'
tags: [Accessibility, HTML, UX]
---

As designers, developers, and accessibility advocates, it's our responsibility to provide an experience that is not just delightful, but also accessible to all users. One commonly overlooked area of web accessibility lies in the design and implementation of product cards, particularly when it comes to adjacent links with the same destination.

<NextImage src='/assets/blogs/blogimage.jpg' alt=''/>

## Identifying the Issue

The design pattern in question often appears in product listings or cards, where you'd see an image link and a text link side-by-side, both leading to the same destination. While this might seem user-friendly at first glance, it poses significant issues for keyboard and screen reader users, particularly when these cards are rendered in a large list.

To understand why, let's think from the perspective of someone who relies on a screen reader or keyboard navigation.

For these users, every interactive element on the page (like links or buttons) should ideally be unique and clearly describable. When we use adjacent links that lead to the same destination, these users encounter two separate interactive elements for the same purpose, essentially creating unnecessary "noise".

This redundancy requires double the effort for keyboard users, who must tab through each link separately, and for screen reader users, who hear the same destination announced twice. This can quickly become overwhelming and tiring, especially in a long list of products.

## Example Scenario and Code

Here is a common example of this issue. Consider a product card where both the image and the title of the product are separately linked to the same product detail page:

<CodePenEmbed user='thommccarthy' slugHash='VwEJQxK' title='Accessibility: Illustrating Adjacent Links Issue for Keyboard Navigation' />

## Solving the Issue

Fortunately, there are simple solutions for these accessibility issues. The most straightforward one is to have only a single link that wraps all the content leading to the same destination.

Here's an example of how to modify the previous HTML:

```
<div class="product-card">
  <a href="/product-detail.html">
    <img src="product.jpg" alt="Product Name">
    <h2>Product Name</h2>
    <p>Product description...</p>
  </a>
</div>
```

In this setup, all of the relevant information is grouped into a single interactive element. The screen reader will treat it as one link and announce all of the content within the link once. Keyboard users will also be able to select the entire card with one tab press.

One concern may be the styling of the "product-card" with this new structure. But, with CSS flexbox or grid, the layout of this single-link card can be kept exactly the same as the previous one.

It's worth noting that these techniques are in line with the Web Content Accessibility Guidelines (WCAG) 2.1 under guideline 2.4.4: Link Purpose (In Context).

## Conclusion

Product card design is a seemingly simple yet powerful component of web design. As developers and designers, it is crucial to be aware of these small yet impactful aspects of accessibility. A thoughtful design not only reduces the noise for screen reader and keyboard users but also provides a more streamlined navigation for everyone, fostering an inclusive digital environment.

Remember, the goal is not just to comply with standards but to ensure our web presence is usable and friendly to all users. Small changes, like modifying how we handle adjacent links, can make a significant difference in achieving this goal. Let's build for all.
