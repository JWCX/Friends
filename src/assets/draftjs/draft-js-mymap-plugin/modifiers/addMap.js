import {
  EditorState,
  AtomicBlockUtils,
} from 'draft-js';

export default (editorState, link, mapSrc, data, extraData) => {
  const urlType = 'MAP';
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', {...extraData, link, mapSrc, data});
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );
  return EditorState.forceSelection(
    newEditorState,
    newEditorState.getCurrentContent().getSelectionAfter()
  );
};
