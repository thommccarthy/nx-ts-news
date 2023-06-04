---
title: 'Creating Accessible Modal Dialogs with React, and TypeScript'
description: 'Delve into the intricacies of developing accessible modal dialogs using the power of React, and TypeScript. This comprehensive guide includes examples and refactoring techniques.'
slug: modal-react-ts
meta: 'Uncover the process of creating accessible modal dialogs with Vite, React, and TypeScript. Understand the benefits of reusable components and hooks in refactoring your code.'
date: '2023-06-04 12:00:00'
tags: [Accessibility, React, TypeScript, Hooks]
---

Developing accessible web applications means ensuring that all users, including those with disabilities, can use your applications effectively. This article provides a comprehensive guide on creating accessible modal dialogs with Vite, React, and TypeScript. It offers an exhaustive exploration of the topic, starting from the basics to providing hands-on examples with hooks and reusable components. Let's dive in.

## Prerequisites

Before proceeding, ensure that you have Node.js and npm installed on your machine. We'll use Vite, a modern frontend build tool developed by Evan You, the creator of Vue.js. It's simple, efficient, and perfect for our use case. Also, we will use React, a popular JavaScript library for building user interfaces, and TypeScript, a statically typed superset of JavaScript that provides optional static typing.

Setting up the Project
Install Vite by running:

```
npm install -g create-vite
```

Next, create a new project:

```
create-vite my-modal-app --template react-ts
```

Navigate to the new project:

```
cd my-modal-app
```

Then, install the project dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

You should see your application running on http://localhost:3000.

## Building the Modal Component

We'll start by creating a simple modal dialog. In your components directory, create a new file called Modal.tsx. It might look something like this:

```
// src/components/Modal.tsx

import React from 'react';

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
    <div>
      <div>
        {children}
      </div>
      <div>
        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
```

This is a simple modal component that renders its children and displays a Close button. It only renders if showModal is true.

Now, let's use this component in our App.tsx:

```
// src/App.tsx

import React, { useState } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>

      <Modal showModal={showModal} onClose={() => setShowModal(false)}>
        <h2>Hello, world!</h2>
        <p>Welcome to our modal dialog.</p>
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

ARIA roles and properties are used to improve accessibility by providing additional semantics about the structure of your elements and their behaviors.

Update the Modal.tsx with the ARIA roles and properties:

```
// src/components/Modal.tsx

import React from 'react';

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
    <div role="dialog" aria-modal="true">
      <div>
        {children}
      </div>
      <div>
        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
```

In this code, we added role="dialog" to the modal's container div to let assistive technologies know that it's a dialog. We also added aria-modal="true" to inform assistive technologies that the content behind the modal is inaccessible when the modal is open.

### Trapping Focus

Next, we want to ensure that when our modal is open, users can't interact with the content behind it. This is especially important for keyboard and screen reader users. Let's create a hook called useFocusTrap.

Create a new file in your hooks directory called useFocusTrap.ts and add the following code:

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

This hook uses the useEffect hook to add an event listener for the 'keydown' event when the modal is open. The event listener checks if the 'Tab' key was pressed, and if so, moves the focus accordingly.

Next, update your Modal.tsx to use this new hook:

```
// src/components/Modal.tsx

import React, { useRef } from 'react';
import useFocusTrap from '../hooks/useFocusTrap';

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ showModal, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(modalRef);

  if (!showModal) {
    return null;
  }

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      <div>
        {children}
      </div>
      <div>
        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
```

With these updates, our modal is much more accessible. However, we can go one step further and make it even more reusable.

## Making a Reusable Wrapper Component

Often, in the world of React, you'll find yourself reusing components across your application. You might want to reuse this modal component in multiple places, but currently, it has some shortcomings:

You always need to handle the state of whether the modal is shown or not outside of the component.
You always need to pass a function to close the modal.
Let's create a reusable wrapper component that will handle this for us.

Create a new file in your components directory called ModalWrapper.tsx:

```
// src/components/ModalWrapper.tsx

import React, { useState, useCallback } from 'react';
import Modal from './Modal';

type ModalWrapperProps = {
  trigger: (show: () => void) => React.ReactNode;
  children: (hide: () => void) => React.ReactNode;
};

const ModalWrapper = ({ trigger, children }: ModalWrapperProps) => {
  const [showModal, setShowModal] = useState(false);

  const show = useCallback(() => setShowModal(true), []);
  const hide = useCallback(() => setShowModal(false), []);

  return (
    <>
      {trigger(show)}
      <Modal showModal={showModal} onClose={hide}>
        {children(hide)}
      </Modal>
    </>
  );
};

export default ModalWrapper;
```

This component uses a pattern known as "function as a child" or "render props". It accepts two functions as props: trigger and children. The trigger function is called with a function that can be used to show the modal, and children is called with a function that can be used to hide the modal. This makes the component very flexible and reusable.

Now, you can use the ModalWrapper component in your App.tsx like this:

```
import React from 'react';
import ModalWrapper from './components/ModalWrapper';

const App = () => {
  return (
    <ModalWrapper
      trigger={show => (
        <button onClick={show}>
          Open Modal
        </button>
      )}
    >
      {hide => (
        <>
          <h2>Hello, world!</h2>
          <p>Welcome to our modal dialog.</p>
          <button onClick={hide}>
            Close
          </button>
        </>
      )}
    </ModalWrapper>
  );
};


export default App;
```

Our modal dialog is now even more reusable and maintainable.

## Conclusion

Developing accessible web applications is critical in ensuring that all users, including those with disabilities, can use your applications effectively. In this post, we walked you through the process of creating an accessible modal dialog using Vite, React, and TypeScript. We discussed how to set up a Vite project, build a simple modal dialog, enhance its accessibility, and refactor it into a reusable component.

While the principles of accessibility can be complex, libraries such as React, along with modern JavaScript tools like Vite and TypeScript, can make the task of creating accessible web applications more manageable. It's our responsibility as developers to ensure our applications are accessible to everyone. By implementing accessible modal dialogs as described in this post, you're taking a big step towards achieving that goal. Happy coding!
