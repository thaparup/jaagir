'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import only the CKEditor React component (because it's a real React component)
const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), {
  ssr: false,
});

const Editor: React.FC = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef<any>(null);
  const [data, setData] = useState('<p>Hello from CKEditor 5!</p>');

  useEffect(() => {
    // Dynamically require ClassicEditor only on client
    import('@ckeditor/ckeditor5-build-classic').then((mod) => {
      editorRef.current = mod;
      setEditorLoaded(true);
    });
  }, []);

  return (
    <div>
      <h2>Editor Component</h2>
      {editorLoaded ? (
        <CKEditor
          editor={editorRef.current}
          data={data}
          config={{
            toolbar: [
              'heading', '|',
              'bold', 'italic', '|',
              'bulletedList', 'numberedList', '|',
              'undo', 'redo',
            ],
          }}
          onReady={(editor: any) => {
            console.log('Editor is ready', editor);
          }}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            setData(data);
            console.log('Editor data:', data);
          }}
        />
      ) : (
        <p>Loading Editor...</p>
      )}
    </div>
  );
};

export default Editor;
