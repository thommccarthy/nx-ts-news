---
title: 'Reducing Redundant Links in Cards: Improving Web Accessibility'
description: 'Learn how to improve the accessibility of adjacent links in elements such as cards.'
slug: redundant-links-in-cards
meta: 'Learn how to improve the accessibility of adjacent links in elements such as cards.'
date: '2023-06-05 12:00:00'
tags: [Accessibility, HTML, UX, Javscript]
---

When developing accessible web applications, it's essential to pay attention to common patterns that might hinder accessibility. One pattern we often come across is the redundancy of links in card components. This redundancy, while seemingly innocuous for sighted mouse users, could potentially be an obstacle for keyboard and screen reader users.

## The Redundancy Issue

Take a look at this card structure, commonly seen across the web:

```
<div class='section-wrapper'>
  <h2>Cards and Stuff</h2>
  <ul class='cards-wrapper'>
    <li>
      <div class='card'>
        <a href='https://www.w3.org/WAI/standards-guidelines/wcag/' target='__blank' aria-label='W3 Schools WCAG Guidelines'>
          <img src='https://picsum.photos/id/35/400/300' alt=''/>
        </a>
        <p>Textual description of the card content.</p>
        <a class='btn' href='https://www.w3.org/WAI/standards-guidelines/wcag/' target='__blank' aria-label='W3 Schools WCAG Guidelines'>W3 Schools</a>
      </div>
    </li>
    <!-- more list items -->
  </ul>
</div>
```

Here, the image and button within each card link to the same URL. For keyboard and screen reader users, each of these elements is a separate interactive entity, thereby complicating navigation and comprehension. This is especially problematic for cards that are part of a list, as sometimes they may need to navigate through each actionable element two or three times before reaching the next card.

## The Preferred HTML Solution

The optimal solution for this issue involves wrapping the card's content within a single a tag, like so:

```
<div class='section-wrapper'>
  <h2>Cards and Stuff</h2>
  <ul class='cards-wrapper'>
    <li>
      <div class='card'>
        <a href='https://www.w3.org/WAI/standards-guidelines/wcag/' target='__blank' aria-label='W3 Schools WCAG Guidelines'>
          <img src='https://picsum.photos/id/35/400/300' alt=''/>
          <p>Textual description of the card content.</p>
          <span class='btn'>W3 Schools</span>
        </a>
      </div>
    </li>
    <!-- more list items -->
  </ul>
</div>
```

This fix eliminates the redundancy, making navigation smoother for all users. However, there could be situations where this solution might not suit the UX requirements—for instance, if users need to interact with certain elements individually, like selecting text without activating the link.

## JavaScript Alternative

When the HTML solution doesn't quite fit, we can offer an alternative using JavaScript. Here, the a tag wrapping the image is replaced with a div, while storing the URL in a data-href attribute:

```
<div class='section-wrapper'>
  <h2>Cards and Stuff</h2>
  <ul class='cards-wrapper'>
    <li>
      <div class='card'>
        <div class='image-link' data-href='https://www.w3.org/WAI/standards-guidelines/wcag/'>
          <img src='https://picsum.photos/id/35/400/300' alt=''/>
        </div>
        <p>Textual description of the card content.</p>
        <a class='btn' href='https://www.w3.org/WAI/standards-guidelines/wcag/' target='__blank' aria-label='W3 Schools WCAG Guidelines'>W3 Schools</a>
      </div>
    </li>
    <!-- more list items -->
  </ul>
</div>
```

The div with the image-link class holds the image, and JavaScript handles the click event:

```
document.querySelectorAll('.image-link').forEach((div) => {
  div.addEventListener('click', function() {
    window.location.href = this.dataset.href;
  });
});
```

By making this adjustment, clicking on the div that contains the image will redirect to the specified URL. Meanwhile, keyboard users retain an efficient navigation with a single tab-stop per card.

To convey the interactivity to sighted mouse users, you would need to apply cursor: pointer to the .image-link in your CSS.

```
.image-link {
  cursor: pointer;
}
```

## Conclusion

Enhancing web accessibility often involves addressing small details that may otherwise be easily overlooked. By removing redundancy in our card design, we provide a smoother navigation experience for keyboard and screen reader users, aligning closer with WCAG guidelines. Whether it's modifying HTML structures or utilizing JavaScript, remember that each step toward a more accessible web is a step in the right direction.
