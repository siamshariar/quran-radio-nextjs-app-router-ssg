import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

const TODOS_KEY = "my-todos";

export const useSampleStorage = () => {
  const [store, setStore] = useState();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const initStorage = async () => {
      const newStore = new Storage({
        name: "nazmulDB",
        driverOrder: [
          CordovaSQLiteDriver._driver,
          Drivers.IndexedDB,
          Drivers.LocalStorage,
        ],
      });

      await newStore.defineDriver(CordovaSQLiteDriver);

      const store = await newStore.create();
      setStore(store);

      const stroedTodos = (await store.get(TODOS_KEY)) || [];
      setTodos(stroedTodos);
    };

    initStorage();
  }, []);

  const addTodo = async (task) => {
    const newTodo = {
      task: task,
      created: new Date().getTime(),
      status: 0,
      id: "" + new Date().getTime(),
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    store?.set(TODOS_KEY, updatedTodos);
  };

  const updateTodoStatus = async (id, status) => {
    const toUpdate = [...todos];
    let todo = toUpdate.filter((todo) => todo.id === id)[0];
    todo.status = status;
    setTodos(toUpdate);
    // console.log(toUpdate, todos);
    return store?.set(TODOS_KEY, toUpdate);
  };

  const removeTodo = async (id) => {
    let updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
    return store?.set(TODOS_KEY, updated);
  };

  return {
    todos,
    addTodo,
    updateTodoStatus,
    removeTodo,
  };
};
