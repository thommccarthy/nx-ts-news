---
title: 'Creating Accessible Modal Dialogs with React and TypeScript'
description: 'Delve into the intricacies of developing accessible modal dialogs using the power of React, and TypeScript. This comprehensive guide includes examples and refactoring techniques.'
slug: modal-react-ts
meta: 'Uncover the process of creating accessible modal dialogs with Vite, React, and TypeScript. Understand the benefits of reusable components and hooks in refactoring your code.'
date: '2023-06-11 12:00:00'
tags: [Accessibility, React, TypeScript, Hooks]
---

Creating web applications with accessibility in mind is essential. It's about making sure everyone can use your applications effectively, including people with disabilities. Regrettably, it's estimated that only about 3% of the web is accessible.

I've found myself frequently dealing with modals in my work recently, and I thought it'd be helpful to share what I've learned. Not just for others, but also as a way for me to reinforce my understanding and have a ready reference for the future.

So, in this guide, I'll share how to create accessible modal dialogs using React and TypeScript. We'll build a hands-on example including building our own custom React Hook.

## Prerequisites

Before proceeding, ensure that you have <ExternalLink href='https://nodejs.org/'>Node.js</ExternalLink> and <ExternalLink href='https://npmjs.com/'>npm</ExternalLink> installed on your machine. We'll use <ExternalLink href='https://vitejs.dev/guide/'>Vite</ExternalLink>, a modern frontend build tool developed by Evan You, the creator of Vue.js. It's simple, efficient, and perfect for our use case. These techniques should apply to any modern React framework or app developed using functional, client components (these specific techniques are not compatible with React's new <ExternalLink href='https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components'>Server Components</ExternalLink>, though core accessibility requirements are the same). Also, we will use <ExternalLink href='https://www.typescriptlang.org/'>Typescript</ExternalLink>, a statically typed superset of JavaScript that provides optional static typing. This guide assumes that you do have a basic understanding of React (and React Hooks), TypeScript, and CSS.

## Setting up the Project

Create project using the react-ts template by running:

```
npm create vite@latest react-modal-ts --template react-ts
```

Navigate to the new project:

```
cd react-modal-ts
```

Then, install the project dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

You should see your application running on http://localhost:5713
.

Let's start off by setting up the base styles for our application in `src/index.css`.

```
/* src/index.css */

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  min-height: 100vh;
  text-align: center;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
}
```

We'll also need some specific styles for our modal in `src/components/Modal.css`.

```
/* src/components/Modal.css */

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 1em;
  max-width: 500px;
  min-width: 300px;
}
```

## Building the Modal Component

We'll start by creating a simple modal dialog. In your components directory, create a new file called `Modal.tsx`:

```
// src/components/Modal.tsx

import React from 'react';
import './Modal.css';

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ showModal, onClose, children }: ModalProps) => {
  if (!showModal) {
    return null;
  }

  return (
    <div onClick={onClose} className='modal-backdrop'>
      <div className='modal-content' onClick={e.stopPropagation()}>
        <button onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
```

This is a simple modal component that renders its children and displays a Close button. It only renders if `showModal` is true. We also pass an `onClose` function that will be called when the user clicks the Close button or the backdrop. Make sure to add the `stopPropagation()` call to the modal content to prevent the backdrop click event from triggering the `onClose` function.

Now, let's use this component in our `App.tsx`:

```
// src/App.tsx

import React, { useState } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setShowModal(true);
  };

  return (
    <div>
      <h1>Accessible React Modal</h1>
      <button
        onClick={openModal}
      >
        Open Modal
      </button>

      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      >
        <h2 id='sample-modal-heading'>
          Accessible Modal Example
        </h2>
        <p>
          This component provides a practical demonstration of an accessible
          modal dialog that secures user focus within its boundaries. By
          implementing it in React, we capitalize on the benefits of component
          reusability and scalability. TypeScript further fortifies our design
          by enhancing code clarity, simplifying intent recognition, and
          minimizing the potential for common errors.
        </p>
        <ul>
          <li>
            <a href='https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/'>
              ARIA Design Pattern for Modal Dialogs
            </a>
          </li>
          <li>
            <a href='https://react.dev/learn/reusing-logic-with-custom-hooks'>
              React Custom Hooks
            </a>
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default App;
```

If you go back to your browser, you should now be able to open and close the modal by clicking the Open and Close buttons.

## Enhancing Accessibility

Now let's make our modal more accessible. First, we'll add some ARIA roles and properties, and then trap the focus within the modal when it's open.

### ARIA Roles and Properties

ARIA roles and properties are used to improve accessibility by providing additional semantics about the structure of your elements and their behaviors. Some are static and some will need to be updated as they react to user events.

Update the `Modal.tsx` component with the following code:

```
// src/components/Modal.tsx

import React, { useEffect } from 'react';
import './Modal.css';

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
  triggerElementRef: React.RefObject<HTMLElement>;
  modalHeadingRef?: React.RefObject<HTMLHeadingElement>;
};

const Modal = ({
  showModal,
  onClose,
  children,
  triggerElementRef,
  modalHeadingRef,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [labelledbyId, setLabelledbyId] = useState<string>('');

  useEffect(() => {
    if (!showModal && triggerElementRef.current) {
      triggerElementRef.current.focus();
    }

    if (showModal && modalHeadingRef?.current?.id) {
      setLabelledbyId(modalHeadingRef.current.id);
    }
  }, [showModal, triggerElementRef, modalHeadingRef]);

  if (!showModal) {
    return null;
  }

  return (
    <div
      className='modal-backdrop'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-labelledby={labelledbyId}
      ref={modalRef}
    >
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
```

In this code, we added `role="dialog"` to the modal's container div to let assistive technologies know that it's a dialog. We also added `aria-modal="true"` to inform assistive technologies that the content behind the modal is inaccessible when the modal is open. We have also added an aria-labelledby to reference the modal's heading. Alternatively, you could use aria-label to provide a static, descriptive label for the modal.

We've added a new prop called `triggerElementRef` to the `ModalProps` type. This will be used to return focus to the element that triggered the modal when it's closed. We've also added a `modalHeadingRef` prop to reference the modal's heading. This will be used to set the `aria-labelledby` attribute on the modal.

We've also added a new state variable called `labelledbyId` to store the id of the modal's heading. We'll use this to set the `aria-labelledby` attribute on the modal.

Next, we've added a `useEffect` hook to set the `labelledbyId` state variable when the modal is opened. We also added a check to return focus to the trigger element when the modal is closed.

We will also need to update our `App.tsx` with the following code:

```
// src/App.tsx
import { useState, useRef } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const triggerElementRef = useRef<null | HTMLElement>(null);
  const modalHeadingRef = useRef<HTMLHeadingElement>(null);

  const openModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    triggerElementRef.current = event.currentTarget;
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Accessible React Modal</h1>
      <button
        onClick={openModal}
        aria-haspopup='dialog'
        aria-expanded={showModal ? 'true' : 'false'}
      >
        Open Modal
      </button>

      <Modal
        showModal={showModal}
        onClose={closeModal}
        triggerElementRef={triggerElementRef}
        modalHeadingRef={modalHeadingRef}
      >
        <h2 ref={modalHeadingRef} id='accessible-modal-heading'>
          Accessible Modal Example
        </h2>
        <p>
          This component provides a practical demonstration of an accessible
          modal dialog that secures user focus within its boundaries. By
          implementing it in React, we capitalize on the benefits of component
          reusability and scalability. TypeScript further fortifies our design
          by enhancing code clarity, simplifying intent recognition, and
          minimizing the potential for common errors.
        </p>
        <ul>
          <li>
            <a href='https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/'>
              ARIA Design Pattern for Modal Dialogs
            </a>
          </li>
          <li>
            <a href='https://react.dev/learn/reusing-logic-with-custom-hooks'>
              React Custom Hooks
            </a>
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default App;
```

In this code, we've added a new ref called modalHeadingRef to reference the modal's heading. We've also added `aria-haspopup="dialog"` and `aria-expanded={showModal ? 'true' : 'false'}` to the Open Modal button. This will let assistive technologies know that the button opens a dialog and whether or not the dialog is open.

Finally, we are passing the `triggerElementRef` and `modalHeadingRef` to the Modal component.

### Trapping Focus

Next, we want to ensure that when our modal is open, users can't interact with the content behind it. This is especially important for keyboard and screen reader users. Let's create a hook called `useFocusTrap`.

Create a new file in your hooks directory called `useFocusTrap.ts` and add the following code:

```
// src/hooks/useFocusTrap.ts

import { useEffect } from 'react';

const FOCUSABLE_ELEMENTS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

const useFocusTrap = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const focusableElements = ref.current?.querySelectorAll(FOCUSABLE_ELEMENTS);

    if (focusableElements?.length) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) { /* shift + tab */
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else { /* tab */
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      firstElement.focus();

      document.addEventListener('keydown', handleTabKey);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [ref]);
};


export default useFocusTrap;
```

The `FOCUSABLE_ELEMENTS` constant is a list of all the elements that can receive focus. We'll use this to find all the focusable elements within the modal. It is a comma-separated list of CSS selectors.

This hook uses the `useEffect` hook to add an event listener for the 'keydown' event when the modal is open. The event listener checks if the 'Tab' key was pressed, and if so, moves the focus accordingly. If the 'Shift' key is pressed along with the 'Tab' key, the focus will move backwards. Otherwise, the focus will move forward. The hook also returns a cleanup function to remove the event listener when the modal is closed. This ensures that the event listener is only active when the modal is open.

Next, update your `Modal.tsx` to use this new hook:

```
// src/components/Modal.tsx

import React, { useEffect, useRef, useState } from 'react';
import useFocusTrap from '../hooks/useFocusTrap';
import './Modal.css';

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
  triggerElementRef: React.RefObject<HTMLElement>;
  modalHeadingRef?: React.RefObject<HTMLHeadingElement>;
};

const Modal = ({
  showModal,
  onClose,
  children,
  triggerElementRef,
  modalHeadingRef,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [labelledbyId, setLabelledbyId] = useState<string>('');

  useFocusTrap(modalRef, showModal);

  useEffect(() => {
    if (!showModal && triggerElementRef.current) {
      triggerElementRef.current.focus();
    }

    if (showModal && modalHeadingRef?.current?.id) {
      setLabelledbyId(modalHeadingRef.current.id);
    }
  }, [showModal, triggerElementRef, modalHeadingRef]);

  if (!showModal) {
    return null;
  }

  return (
    <div
      className='modal-backdrop'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-labelledby={labelledbyId}
      ref={modalRef}
    >
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
```

With these updates, our modal is much more accessible.

## Conclusion

In this post, we walked through the process of creating an accessible modal dialog using Vite, React, and TypeScript. We discussed how to set up a Vite project, build a simple modal dialog and enhance its accessibility.

While the principles of accessibility can be complex, libraries such as React, along with modern JavaScript tools like Vite and TypeScript, can make the task of creating accessible web applications more manageable. It's our responsibility as developers to ensure our applications are accessible to everyone. By implementing accessible modal dialogs as described in this post, you're taking a positive step towards achieving that goal. My goal is to make certain that any discussions around designing web User Interfaces include accessibility as a primary consideration.

If there's something you feel that I missed please file an issue on the <ExternalLink href='https://github.com/thommccarthy/react-modal-ts'>Github Repo</ExternalLink> with some reference material and I'll take a look. Thanks for reading!
