import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './Wysiwyg.module.scss';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const Wysiwyg = ({ state, setState }) => {
  return (
    <Editor
      editorState={state}
      wrapperClassName={styles.richText}
      toolbarClassName={styles.toolbar}
      editorClassName={styles.textfield}
      onEditorStateChange={setState}
      toolbar={{
        options: ['inline', 'list', 'textAlign', 'remove', 'history'],
      }}
    />
  );
};

export default Wysiwyg;
