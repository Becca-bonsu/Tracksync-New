import React from 'react';

const LettersSummary = () => {
    const incomingLetters = [
        { id: 1, sender: 'John Doe', subject: 'Meeting Request', date: '2023-10-01' },
        { id: 2, sender: 'Jane Smith', subject: 'Project Update', date: '2023-10-02' },
    ];

    const outgoingLetters = [
        { id: 1, recipient: 'Alice Johnson', subject: 'Feedback', date: '2023-10-03' },
        { id: 2, recipient: 'Bob Brown', subject: 'Invitation', date: '2023-10-04' },
    ];

    return (
        <div className="letters-summary">
            <h2>Letters Summary</h2>
            <div className="incoming-letters">
                <h3>Incoming Letters</h3>
                <ul>
                    {incomingLetters.map(letter => (
                        <li key={letter.id}>
                            <strong>From:</strong> {letter.sender} | <strong>Subject:</strong> {letter.subject} | <strong>Date:</strong> {letter.date}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="outgoing-letters">
                <h3>Outgoing Letters</h3>
                <ul>
                    {outgoingLetters.map(letter => (
                        <li key={letter.id}>
                            <strong>To:</strong> {letter.recipient} | <strong>Subject:</strong> {letter.subject} | <strong>Date:</strong> {letter.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LettersSummary;