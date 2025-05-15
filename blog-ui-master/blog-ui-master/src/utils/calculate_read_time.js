function calculateReadTime(blocks, wordsPerMinute = 200) {
    if(!blocks) return;
    const textContent = blocks.map(block => block.data.text || "").join(" ");
    const wordCount = textContent.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
}

export default calculateReadTime;