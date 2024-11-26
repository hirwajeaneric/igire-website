"use client";

import * as Dialog from "@radix-ui/react-dialog";

export function Modal({ open, onOpenChange, children }) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-md">
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export function ModalHeader({ children }) {
    return <div className="mb-4 text-lg font-semibold">{children}</div>;
}

export function ModalBody({ children }) {
    return <div className="mb-6">{children}</div>;
}

export function ModalFooter({ children }) {
    return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}
