'use client';

import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditLeaveTypeModal = ({ leaveType, onSave, onClose }) => {
    const [updatedLeaveType, setUpdatedLeaveType] = useState(leaveType);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedLeaveType((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(updatedLeaveType);
        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalHeader>Edit Leave Type</ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-4">
                    <Input
                        name="leaveType"
                        value={updatedLeaveType.leaveType}
                        onChange={handleChange}
                        placeholder="Leave Type"
                        className="w-full"
                    />
                    <Input
                        name="givenleavedays"
                        value={updatedLeaveType.givenleavedays}
                        onChange={handleChange}
                        placeholder="Given Days"
                        className="w-full"
                        type="number"
                    />
                    <Input
                        name="creationDate"
                        value={updatedLeaveType.creationDate}
                        onChange={handleChange}
                        placeholder="Creation Date"
                        className="w-full"
                        type="date"
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 text-white">
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditLeaveTypeModal;
