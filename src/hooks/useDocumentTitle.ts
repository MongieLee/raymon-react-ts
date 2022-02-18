import {useEffect} from "react";

const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  const oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};
export {useDocumentTitle};
