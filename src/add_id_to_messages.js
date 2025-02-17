const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'mocks/chat_data.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to load file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    let maxId = Math.max(0, ...jsonData.messages.map(msg => msg.id || 0));

    updatedMessages = jsonData.messages.map(msg => ({
      ...msg,
      id: msg.id || ++maxId,
    }));

    const newJsonData = {
      ...jsonData,
      messages: updatedMessages,
    };

    fs.writeFile(
      filePath,
      JSON.stringify(newJsonData, null, 2),
      'utf8',
      (writeErr) => {
        if (writeErr) {
          console.error('Failed to write file:', writeErr);
        } else {
          console.log('Successfully wrote all IDs');
        }
      },
    );
  } catch (err) {
    console.error(err);
  }
});
