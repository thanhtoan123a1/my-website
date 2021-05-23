import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
import { useTranslation } from 'react-i18next';

function EditImage(props) {
  const [preview, setPreview] = useState(null);
  const { t } = useTranslation();

  const { onSave } = props;

  function onClose() {
    setPreview(null);
  }

  function onCrop(preview) {
    setPreview(preview);
  }

  function handleSave() {
    onSave(preview);
  }

  return (
    <div className="edit-wrapper">
      <div className="edit-title">{t('uploadNewAvatar')}</div>
      <div className="avatar-wrapper">
        <Avatar
          width={200}
          height={200}
          onCrop={onCrop}
          onClose={onClose}
          label={t('chooseFile')}
          exportAsSquare
          exportSize={200}
        />
        {preview && (
          <img src={preview} alt="Preview" className="avatar-wrapper__img" />
        )}
      </div>
      <div className="avatar-save-button-wrapper">
        <button
          className="avatar-save-button btn-round"
          color="success"
          onClick={handleSave}
          disabled={!preview}
        >
          {t('save')}
        </button>
      </div>
    </div>
  );
}

export default EditImage;
