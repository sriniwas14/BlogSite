exports.trimText = (text, characterLimit) => {
    if(characterLimit>text.length-3) return text
    const trimmedText = text.slice(0, characterLimit)
    return trimmedText+"..."
}
