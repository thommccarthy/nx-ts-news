---
title: 'Creating Accessible Modal Dialogs with React and TypeScript'
description: 'Delve into the intricacies of developing accessible modal dialogs using the power of React, and TypeScript. This comprehensive guide includes examples and refactoring techniques.'
slug: modal-react-ts
meta: 'Uncover the process of creating accessible modal dialogs with Vite, React, and TypeScript. Understand the benefits of reusable components and hooks in refactoring your code.'
date: '2023-06-11 12:00:00'
tags: [Accessibility, React, TypeScript, Hooks]
---

Creating web applications with a focus on accessibility is not just a nice-to-have, it's a necessity. It ensures that your applications are usable by everyone, regardless of their abilities. Alarmingly, it's approximated that a mere 3% of the internet is truly accessible.

In my recent work, modals have been a recurrent theme. I thought it would be beneficial to not only share my discoveries but also to solidify my understanding and have a personal reference handy for the future.

In this guide, I'll walk you through creating an accessible modal dialog using React and TypeScript. We'll dive into a practical example, including the construction of our very own custom React Hook.

## Prerequisites

Before we jump in, there are some prerequisites. Make sure you have <ExternalLink href='https://nodejs.org/'>Node.js</ExternalLink> and <ExternalLink href='https://npmjs.com/'>npm</ExternalLink> installed on your machine. We'll be using <ExternalLink href='https://vitejs.dev/guide/'>Vite</ExternalLink>, a modern and efficient frontend build tool brought to you by Evan You, the creator of Vue.js. It's streamlined, fast, and perfect for our use case. The techniques demonstrated here are applicable to any modern React project using functional, client components (note that these specific techniques aren't compatible with React's new <ExternalLink href='https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components'>Server Components</ExternalLink>, although the core accessibility requirements still apply). Furthermore, we'll be employing <ExternalLink href='https://www.typescriptlang.org/'>Typescript</ExternalLink>, a statically-typed superset of JavaScript that introduces optional static typing to the language. This guide presumes you have a foundational understanding of React (and React Hooks), TypeScript, and CSS.

## Setting up the Project

Create project using the Vite react-ts template by running:

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

We'll also setup a stylesheet for our modal in `src/components/Modal.css`.

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

Next we will build a simple modal dialog. In your components directory, create a new file called `Modal.tsx`:

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
    <div className='modal-backdrop' onClick={onClose}>
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

Here's a basic modal component we'll be working with. It renders its children and includes a Close button, all of which only appear if showModal is set to true. We're also incorporating an onClose function, which is executed when the user clicks on either the Close button or the backdrop. Be sure to add e.stopPropagation() to the click event on the modal-content class to avoid unintentionally triggering the onClose function.

Next, let's put this component into action in our App.tsx. Typically in larger applications, you'd avoid rendering the modal directly in the App.tsx file, but for simplicity's sake, we'll do so in this instance:

```
// src/App.tsx

import React, { useState } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
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
      >
        Open Modal
      </button>

      <Modal
        showModal={showModal}
        onClose={closeModal}
      >
        <h2 id='sample-modal-heading'>
          Accessible Modal Example
        </h2>
        <p>
          This component provides a practical demonstration of an accessible modal dialog that secures user focus within its boundaries. By implementing it in React, we capitalize on the benefits of component
          reusability and scalability. TypeScript further fortifies our design by enhancing code clarity, simplifying intent recognition, and minimizing the potential for common errors.
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

ARIA roles and properties serve to enhance accessibility, imparting more detailed semantics about the structure of your elements and their associated behaviors. While some of these properties are static, others need to be dynamically updated in response to user interactions.

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
  modalHeadingRef: React.RefObject<HTMLHeadingElement>;
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

The updated code includes some critical additions for enhancing accessibility: `role="dialog"` is assigned to the container div, and `aria-modal="true"` is used to specify the inaccessibility of underlying content when the modal is active. We also use `aria-labelledby` to reference the modal's title.

A new prop `triggerElementRef` is introduced to focus back on the initial element after the modal is closed. Another prop, `modalHeadingRef`, helps reference the modal's title, crucial for the `aria-labelledby` attribute.

A new state variable `labelledbyId` is added to hold the id of the modal's heading, necessary for setting the `aria-labelledby` attribute.

We've also utilized a `useEffect` hook, enabling us to set the `labelledbyId` when the modal is open and ensuring the focus returns to the triggering element when the modal closes.

Lastly, these enhancements necessitate some changes to our App.tsx, which are as follows:

```
// src/App.tsx
import { useState, useRef, useEffect } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  // creating references to the trigger element and the modal's heading
  const triggerElementRef = useRef<null | HTMLElement>(null);
  const modalHeadingRef = useRef<HTMLHeadingElement>(null);

  //we're now passing the event as an argument and storing the event's current target in the triggerElementRef
  const openModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    triggerElementRef.current = event.currentTarget;
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // listening for the Escape key to close the modal and return focus to the trigger element
   useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal === true) {
        closeModal();
        triggerElementRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  return (
    <div>
      <h1>Accessible React Modal</h1>
      <button
        aria-haspopup='dialog'
        aria-expanded={showModal ? 'true' : 'false'}
        onClick={openModal}
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
          This component provides a practical demonstration of an accessible modal dialog that secures user focus within its boundaries. By implementing it in React, we capitalize on the benefits of component
          reusability and scalability. TypeScript further fortifies our design by enhancing code clarity, simplifying intent recognition, and
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

In this update, we add a 'ref' named `modalHeadingRef` to track our modal's heading. The 'Open Modal' button gets `aria-haspopup="dialog"` and `aria-expanded={showModal ? 'true' : 'false'}` so assistive technologies understand it opens a dialog and if it's currently open. We also add a `useEffect` hook to close the modal and shift focus back when the Escape key is pressed. Finally, `triggerElementRef` and `modalHeadingRef` are passed to the `Modal` component.

### Trapping Focus

Next, it's crucial to guarantee that when our modal is open, users cannot interact with the background content. This is particularly important for keyboard and screen reader users. To address this, we'll create a hook named `useFocusTrap`. Also, remember that we've already used the `modal-backdrop` class to visually indicate that the content behind the modal is inactive, which is ideal.

Now, let's create a new file named useFocusTrap.ts in your hooks directory and add the following code:

```
// src/hooks/useFocusTrap.ts

import { useEffect } from 'react';

// a comma-seperated list of css selectors for focusable elements
const FOCUSABLE_ELEMENTS =
  'a[href], area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable]';

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

The `FOCUSABLE_ELEMENTS` constant is a string of CSS selectors, each separated by a comma, representing elements that can receive focus. We'll leverage this to identify all focusable elements within our modal.

Our hook takes advantage of the `useEffect` to add a 'keydown' event listener when the modal is active. This listener checks if the 'Tab' key is pressed and moves the focus accordingly. If both 'Shift' and 'Tab' keys are pressed, the focus moves in the opposite direction. A cleanup function is also returned by the hook to remove the event listener once the modal is closed, ensuring the listener is active only while the modal is open.

Next, let's modify `Modal.tsx` to incorporate this new hook:

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

  // use the focus trap hook on the modal ref, and only run when the modal is open
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

## Wrapping Up

In conclusion, building an accessible modal dialog involves thoughtful application of ARIA roles and attributes, diligent management of focus states, and keen attention to keyboard interactions. We've explored how to make modals more accessible by ensuring that focus is trapped within the modal when it's open and restored to the trigger element when closed. We've also learned how to provide important cues to assistive technologies using ARIA roles, properties, and states.

We've developed a custom React Hook to manage the focus trap, demonstrating how reusable logic can be encapsulated within Hooks, contributing to a cleaner and more maintainable codebase.

While we've used Vite, React and TypeScript specifically, the concepts and techniques presented in this guide are applicable across diverse tooling and language setups, making them valuable assets in your front-end development toolkit.

Remember, web accessibility isn't a mere afterthought; it's an integral part of the development process. As developers, our goal should be to create applications that everyone can use and enjoy. Accessibility is, therefore, not just about compliance with standards or avoiding legal issues—it's about empathy, inclusion, and creating a better web experience for all.

If there's something you feel that I missed please file an issue on the <ExternalLink href='https://github.com/thommccarthy/react-modal-ts'>Github Repo</ExternalLink> with some reference material and I'll take a look. Thanks for reading!

## Reference Materials

- <a href='https://github.com/thommccarthy/react-modal-ts' rel='noopener noreferrer'>Github Repo: react-modal-ts</a>
- <a href='https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/' target='__blank' rel='noopener noreferrer'>WAI-ARIA Authoring Practices: Dialog Modal</a>
- <a href='https://vitejs.dev/' target='__blank' rel='noopener noreferrer'>Vite</a>
- <a href='https://www.typescriptlang.org/' target='__blank' rel='noopener noreferrer'>TypeScript</a>
