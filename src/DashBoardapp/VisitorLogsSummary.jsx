import React from 'react';

const VisitorLogsSummary = () => {
    const visitorLogs = [
        { name: 'John Doe', purpose: 'Meeting', time: '10:00 AM' },
        { name: 'Jane Smith', purpose: 'Consultation', time: '10:30 AM' },
        { name: 'Alice Johnson', purpose: 'Delivery', time: '11:00 AM' },
        { name: 'Bob Brown', purpose: 'Interview', time: '11:30 AM' },
    ];

    return (
        <div className="visitor-logs-summary">
            <h2>Visitor Logs Summary</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Purpose of Visit</th>
                        <th>Time of Visit</th>
                    </tr>
                </thead>
                <tbody>
                    {visitorLogs.map((visitor, index) => (
                        <tr key={index}>
                            <td>{visitor.name}</td>
                            <td>{visitor.purpose}</td>
                            <td>{visitor.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitorLogsSummary;