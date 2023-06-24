---
title: 'Reducing Redundant Links in Cards: Improving Web Accessibility'
description: 'Learn how to handle a common issue which will improve the accessibility of adjacent links in elements such as cards.'
slug: redundant-links-in-cards
meta: 'Learn how to handle a common issue which will improve the accessibility of adjacent links in elements such as cards.'
date: '2023-06-02 12:00:00'
tags: [Accessibility, HTML, UX, Javascript]
---

When developing accessible web applications, it's essential to pay attention to common patterns that might hinder accessibility. One pattern we often come across is the redundancy of links in card components. This redundancy, while seemingly innocuous for sighted mouse users, could potentially be an obstacle for keyboard and screen reader users.

## The Redundancy Issue

Take a look at this card structure, commonly seen across the web:

```
  <ul class='cards-wrapper'>
    <li>
      <div class='card'>
        <a href='https://www.w3.org/WAI/standards-guidelines/wcag/'>
          <img src='https://picsum.photos/id/35/400/300' alt=''/>
        </a>
        <p>Textual description of the card content.</p>
        <a class='btn' href='https://www.w3.org/WAI/standards-guidelines/wcag/'>W3 Schools</a>
      </div>
    </li>
    <!-- more list items -->
  </ul>
```

Here, the image and button within each card link to the same URL. For keyboard and screen reader users, each of these elements is a separate interactive entity, thereby complicating navigation and comprehension. This is especially problematic for cards that are part of a list, as sometimes they may need to navigate through each actionable element two or three times before reaching the next card.

## The Preferred HTML Solution

The optimal solution for this issue involves wrapping the card's content within a single `a` tag, like so:

```
  <ul class='cards-wrapper'>
    <li>
      <div class='card'>
        <a href='https://www.w3.org/WAI/standards-guidelines/wcag/'>
          <img src='https://picsum.photos/id/35/400/300' alt=''/>
          <p>Textual description of the card content.</p>
          <span class='btn'>W3 Schools</span>
        </a>
      </div>
    </li>
    <!-- more cards -->
  </ul>
```

This fix eliminates the redundancy, making navigation smoother for all users. However, there could be situations where this solution might not suit the UX requirements—for instance, if users need to interact with certain elements individually, like selecting text without activating the link.

## JavaScript Alternative

When the HTML solution doesn't quite fit, we can offer an alternative using JavaScript. Here, the a tag wrapping the image is replaced with a `div`, while storing the URL in a `data-href` attribute:

```
  <ul class='cards-wrapper'>
    <li>
      <div class='card'>
        <div class='image-link' data-href='https://www.w3.org/WAI/standards-guidelines/wcag/'>
          <img src='https://picsum.photos/id/35/400/300' alt=''/>
        </div>
        <p>Textual description of the card content.</p>
        <a class='btn' href='https://www.w3.org/WAI/standards-guidelines/wcag/'>W3 Schools</a>
      </div>
    </li>
    <!-- more cards -->
  </ul>
```

The div with the `image-link` class holds the image, and JavaScript handles the click event:

```
let imageLinks = document.querySelectorAll('.image-link');

if (imageLinks) {
  imageLinks.forEach((imageLink) => {
    if (imageLink.dataset && imageLink.dataset.href) {
      imageLink.addEventListener('click', function() {
        window.location.href = this.dataset.href;
      });
    }
  });
}
```

By making this adjustment, clicking on the `div` that contains the image will redirect to the specified URL. Meanwhile, keyboard users retain an efficient navigation with a single tab-stop per card.

To convey the interactivity to sighted mouse users, you would need to apply `cursor: pointer` to the `.image-link` in your CSS.

```
.image-link {
  cursor: pointer;
}
```

## Conclusion

Perfecting web accessibility often lies in the details that can easily be missed. By eradicating redundancy from our card design, we're not just complying with WCAG guidelines — we're forging a smoother navigation experience for keyboard and screen reader users. While changing HTML structures or using JavaScript may seem like small steps, each stride contributes immensely to a more accessible web. You can check out a hands-on [CodePen Collection](https://codepen.io/collection/kNpmZV) I've put together that showcases the issues and solutions discussed here.
