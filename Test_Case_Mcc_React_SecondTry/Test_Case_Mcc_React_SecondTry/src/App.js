import React from 'react';
import './App.css';
import TreeView from './companents/TreeView/TreeView'; // ������������ ��������� NodeTree

function App() {
    return (
        <div>
            <header>
                {/* �������� ����� ���������� ������ header, ���� ����� */}
            </header>
            <TreeView /> {/* ����������� ��������� NodeTree */}
        </div>
    );
}

export default App;