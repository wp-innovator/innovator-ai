export const copyToClipboard = (content: string) => {
    var textField = document.createElement('textarea')
    textField.innerText = content;
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
};
