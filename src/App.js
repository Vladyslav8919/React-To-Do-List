import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem('bud')) || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, type, msg });
  };

  const hideAlert = () => {
    showAlert(false);
  };
  const editItem = (id) => {
    setIsEditing(true);
    setEditID(id);
    setName(list.find((item) => item.id === id).title);
  };
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, 'Removed succesfully', 'danger');
  };
  const clearItems = () => {
    setList([]);
    showAlert(true, 'Empty list', 'danger');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, 'Please enter the value', 'danger');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );

      showAlert(true, 'Edited succesfully', 'success');
      setEditID(null);
      setIsEditing(false);
    } else {
      setList([...list, { id: new Date().getTime(), title: name }]);

      showAlert(true, 'Item added to the list', 'success');
    }
    setName('');
  };

  useEffect(() => {
    localStorage.setItem('bud', JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} hideAlert={hideAlert} />}
        <h3>To-Do List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. learn React"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} editItem={editItem} removeItem={removeItem} />
        {list.length > 1 && (
          <button className="clear-btn" onClick={clearItems}>
            Clear Items
          </button>
        )}
      </div>
    </section>
  );
}

export default App;
