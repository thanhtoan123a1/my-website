import React from "react";
import { Picker } from "emoji-mart";
import data from "emoji-mart/data/apple.json";
import "emoji-mart/css/emoji-mart.css";
import { useTranslation } from "react-i18next";
import './style.scss';

function CustomEmoji(props) {
  const { clickEmoji } = props;
  function handleOnSelect(emoji) {
    clickEmoji(emoji);
  }
  const { t } = useTranslation();
  return (
    <div className="emoji-wrapper">
      <Picker
        onSelect={handleOnSelect}
        data={data}
        native={true}
        set="apple"
        emoji="point_up"
        emojiSize={24}
        perLine={6}
        color="rgb(16, 167, 36)"
        useButton={false}
        theme="light"
        defaultSkin={1}
        sheetSize={64}
        i18n={{ search: t('search'), categories: { search: t('searchResults'), recent: t('recent') } }}
        showSkinTones={false}
        showPreview={false}
        notFoundEmoji="sleuth_or_spy"
      />
    </div>
  );
}

export default CustomEmoji;
