export const formatText = (text: string) => {
  return text.split('¶').map((paragraph, index, array) => (
    <p key={index}>
      {paragraph.trim()}
      {index < array.length - 1 && (
        <>
          <br />¶
        </>
      )}
    </p>
  ));
};
