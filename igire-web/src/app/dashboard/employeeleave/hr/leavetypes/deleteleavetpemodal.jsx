'use client';

import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal"; // Adjust this path based on your project
import { Button } from "@/components/ui/button";

const DeleteLeaveTypeModal = ({ leaveType, onDelete, onClose }) => {
    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalBody>
                <p>Are you sure you want to delete the leave type <strong>{leaveType.leaveType}</strong>?</p>
            </ModalBody>
            <ModalFooter>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    className="bg-red-600 text-white"
                    onClick={() => {
                        onDelete(leaveType);
                        onClose();
                    }}
                >
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteLeaveTypeModal;
