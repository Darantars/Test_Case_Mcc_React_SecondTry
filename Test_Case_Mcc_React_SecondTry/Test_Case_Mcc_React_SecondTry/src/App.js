import React from 'react';
import './App.css';
import TreeView from './companents/TreeView/TreeView'; // Импортируйте компонент NodeTree

function App() {
    return (
        <div>
            <header>
                {/* Добавьте здесь содержимое вашего header, если нужно */}
            </header>
            <TreeView /> {/* Используйте компонент NodeTree */}
        </div>
    );
}

export default App;