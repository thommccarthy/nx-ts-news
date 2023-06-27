---
title: 'Creating Accessible Modal Dialogs with React and TypeScript'
description: 'Build an accessible modal dialog with Vite, React, and TypeScript. Understand the benefits of reusable components and hooks in refactoring your code.'
slug: modal-react-ts
meta: 'Build an accessible modal dialog with Vite, React, and TypeScript. Understand the benefits of reusable components and hooks in refactoring your code.'
date: '2023-06-26 12:00:00'
tags: [Accessibility, React, TypeScript, Hooks]
---

Creating web applications with accessibility in mind isn't just a "nice-to-have" feature; it's a fundamental requirement. This approach ensures your applications are accessible and usable by all, regardless of their individual abilities. Sadly, it's estimated that only about 3% of the internet is genuinely accessible. This issue becomes more amplified when designers and developers look to the less accessible 97% of the internet for their user experience inspirations. The problem is also exacerbated when widely used UI libraries, development frameworks, and platforms, which don't prioritize accessibility, are continually being adopted and installed.

But beyond this, there's a practical aspect to it, too. Building websites that are multifaceted in their usability just makes good sense. Personally, I've found as an able-bodied developer and keyboard enthusiast that I've significantly reduced mouse usage in my daily activities. Keyboard navigation, in my experience, is far more comfortable and efficient. Whenever a website or application forces me to use a mouse to interact with it, it feels like a letdown.

In my recent development work, modals and overlays have been a common ask. I thought it would be beneficial to not only share some insights but also to solidify my own understanding and have a personal reference handy for the future.

In this walkthrough, I'll demonstrate building an accessible modal dialog with the assistance of React and TypeScript. We'll delve into a hands-on example that includes building a few custom React Hooks.

## Prerequisites

Before we jump in, there are some prerequisites. Make sure you have <ExternalLink href='https://nodejs.org/'>Node.js</ExternalLink> and <ExternalLink href='https://npmjs.com/'>npm</ExternalLink> installed on your machine. We'll be using <ExternalLink href='https://vitejs.dev/guide/'>Vite</ExternalLink>, a modern frontend build tool brought to you by Evan You, the creator of Vue.js. It's streamlined, fast, and perfect for our use case. The techniques demonstrated here are applicable to any modern React project using functional, client components (note that these specific techniques aren't compatible with React's new <ExternalLink href='https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components'>Server Components</ExternalLink>, although the core accessibility requirements still apply). Furthermore, we'll be employing <ExternalLink href='https://www.typescriptlang.org/'>Typescript</ExternalLink>, a statically-typed superset of JavaScript that introduces optional static typing to the language. This guide presumes you have a foundational understanding of React (and React Hooks), TypeScript, and CSS.

## Setting up the Project

Create project by running the following command in your terminal:

```
npm create vite@latest react-modal-ts
```

You will be prompted to select a framework and whether you want to use TypeScript. Select React and TypeScript respectively.

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

You should see your application running on http://localhost:5713.

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
      <div className='modal-content' onClick={(event) => event.stopPropagation()}>
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

Here's a basic modal component we'll be working with. It renders its children and includes a Close button, all of which only appear if `showModal` is set to `true`. We're also incorporating an `onClose` function, which is executed when the user clicks on either the Close button or the backdrop. Be sure to add the `stopPropagation()` function to the click event on the `modal-content` to avoid unintentionally triggering the `onClose` function.

Next, let's put this component into action in our `App.tsx`. Typically in larger applications, you'd avoid rendering the modal directly in the `App.tsx` file, but for the scope of this guide, we will do so:

```
// src/App.tsx

import { useState } from 'react';
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

import { useEffect } from 'react';
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
      <div className='modal-content' onClick={(e) => event.stopPropagation()}>
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

Lastly, these enhancements necessitate some changes to our `App.tsx`, which are as follows:

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

### Reuseable Hooks

Next, it's crucial to guarantee that when our modal is open, users cannot interact with the background content. This is particularly important for keyboard and screen reader users. To address this, we'll create a hook named `useFocusTrap`. Also, remember that we've already used the `modal-backdrop` class to visually indicate that the content behind the modal is inactive, which is ideal.

Let's create a new file named `useFocusTrap.ts` in your hooks directory and add the following code:

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

import { useEffect, useRef, useState } from 'react';
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
      <div className='modal-content' onClick={(e) => event.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
```

With these updates, our modal is much more accessible.

I would also like to clean up our `App.tsx` file a bit by extracting some of the logic into it's own hook. Let's create a file named `useModal.ts` in the hooks directory and add the following code:

```
import { useState, useRef, useEffect } from 'react';

const useModal = () => {
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

  return {
    showModal,
    openModal,
    closeModal,
    triggerElementRef,
    modalHeadingRef,
  };
};

export default useModal;
```

This hook encapsulates the logic for opening and closing the modal, as well as handling the 'Escape' key to close the modal. Let's update `App.tsx` to use this hook:

```
import useModal from './hooks/useModal';
import Modal from './components/Modal';

const App = () => {
  const {
    showModal,
    openModal,
    closeModal,
    triggerElementRef,
    modalHeadingRef,
  } = useModal();

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

This makes our `App.tsx` file much cleaner and easier to read, and makes this logic reuseable across your project. While we could keep on breaking things down into smaller, more atomic components, we're keeping it simple for this guide.

Some folks suggest that all logic should be moved out of display components and into custom hooks. This isn't a one-size-fits-all solution, though. Depending on your project's size and scope, it might or might not be the best approach. The important thing is to keep your code clear and manageable.

## Conclusion

Building an accessible modal dialog means careful use of ARIA roles and attributes, good management of focus states, and paying attention to keyboard interactions. We've seen how to make modals more user-friendly by keeping the focus within the modal when it's open, and sending it back to the trigger element when it's closed. We also learned how to give helpful hints to assistive technologies using ARIA roles, properties, and states.

We've put together a few custom hooks, showing how you can pack up reusable logic to make your code cleaner and easier to maintain.

Although we've used Vite, React and TypeScript in our examples, the ideas and techniques we've covered here can be transferred to many different tools and languages. They're handy skills to have in your front-end developer toolkit.

As developers, we need to build apps that everyone can use. Accessibility is about more than just following rules or avoiding legal problems. It's about understanding and including all users, and making the web more comfortable and enjoyable to navigate.

If there's something you think I've missed, please post an issue on the <ExternalLink href='https://github.com/thommccarthy/react-modal-ts'>Github Repo</ExternalLink> with some reference material and I'll take a look. Thanks for reading!

## Reference Materials

- <a href='https://github.com/thommccarthy/react-modal-ts' rel='noopener noreferrer'>Github Repo: react-modal-ts</a>
- <a href='https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/' target='__blank' rel='noopener noreferrer'>WAI-ARIA Authoring Practices: Dialog Modal</a>
- <a href='https://vitejs.dev/' target='__blank' rel='noopener noreferrer'>Vite</a>
- <a href='https://www.typescriptlang.org/' target='__blank' rel='noopener noreferrer'>TypeScript</a>
