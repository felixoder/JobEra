import React, { useState } from 'react';
import axios from 'axios';

interface UpdateStatusProps {
  applicationId: number;
  currentStatus: string;
  author: string;
  username: string;
  onUpdate: () => void;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ applicationId, currentStatus,  onUpdate }) => {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    // Directly update status
    await updateStatus(newStatus);
  };

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true);

    try {
      await axios.put('https://jobera.onrender.com/api/update-status', {
        id: applicationId,
        status: newStatus,
      });

      onUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

 

  return (
    <div>
      <select value={status} onChange={handleStatusChange} disabled={isUpdating}>
        {currentStatus === 'Pending' && <option value="Pending">Pending</option>}
        {currentStatus !== 'Pending' && <option value="Pending" disabled>Pending</option>}
        <option value="Rejected">Rejected</option>
        <option value="Selected">Selected</option>
      </select>
    </div>
  );
};

export default UpdateStatus;
