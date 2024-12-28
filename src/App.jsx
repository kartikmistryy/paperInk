import './App.css'
import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'

function App() {
  const [fontSize, setFontSize] = useState(0)
  const [bgColor, setBgColor] = useState('#f6f6f6')
  const [fontColor, setFontColor] = useState('#2563eb')
  const [noteColor, setNoteColor] = useState('#ffffff')
  const noteRef = useRef(null)  // Reference to the div that contains the textarea
  const [textareaContent, setTextareaContent] = useState('')

  const handleChange = (e) => {
    const inputLength = e.target.value.length;
    const maxInputLength = 150;
    let fontSize = Math.max(30, 50 - (inputLength / maxInputLength) * 20);
    setFontSize(fontSize);
    setTextareaContent(e.target.value);  // Update the content of the textarea
  }

  useEffect(() => {
    if(window.screen.width < 500){
      setFontSize(10)
    }
    else{
      setFontSize(36)
    }
  }, [])

  const takeScreenshot = () => {
    // Hide the navbar and footer before taking the screenshot
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (navbar && footer) {
      navbar.style.display = 'none';
      footer.style.display = 'none';
    }

    // Capture the entire body, excluding navbar and footer
    html2canvas(document.body).then((canvas) => {
      const screenshotDataUrl = canvas.toDataURL('image/png');

      // Trigger the download of the screenshot
      const link = document.createElement('a');
      link.href = screenshotDataUrl;
      link.download = 'screenshot.png';
      link.click();

      // Restore the navbar and footer visibility after the screenshot
      if (navbar && footer) {
        navbar.style.display = '';
        footer.style.display = '';
      }
    });
  }

  return (
    <div style={{ backgroundColor: `${bgColor}` }} className={`h-screen w-full flex flex-col p-0`}>
      <nav className='flex flex-row justify-center items-center py-4 gap-5'>
        <span className='flex items-center justify-center h-8 w-8 rounded-full overflow-hidden border-[1px] border-gray-200 shadow-md'>
          <input
            type='color'
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className='h-8 w-8 rounded-full bg-white scale-150 cursor-pointer'/>
        </span>

        <span className='flex items-center justify-center h-8 w-8 rounded-full overflow-hidden border-[1px] border-gray-200 shadow-md'>
          <input
            type='color'
            value={noteColor}
            onChange={(e) => setNoteColor(e.target.value)}
            className='h-8 w-8 rounded-full bg-white scale-150 cursor-pointer'/>
        </span>

        <span className='flex items-center justify-center h-8 w-8 rounded-full overflow-hidden border-[1px] border-gray-200 shadow-md'>
          <input
            type='color'
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className='h-8 w-8 rounded-full bg-white scale-150 cursor-pointer'/>
        </span>
      </nav>

      <div className='h-full w-full flex items-center justify-center'>
        <div 
          ref={noteRef} 
          className='md:h-[400px] md:w-[410px] w-[80vw] h-[350px] bg-white rounded-3xl shadow-md flex justify-center items-center -rotate-2'>
          <div
            id='input'
            contentEditable
            className='h-full w-full p-8 text-center align-middle resize-none overflow-visible rounded-3xl outline-none'
            onInput={handleChange}
            style={{
              fontSize: `${fontSize}px`,
              color: `${fontColor}`,
              backgroundColor: `${noteColor}`,
              whiteSpace: 'pre-wrap', // Preserve newlines
              wordWrap: 'break-word', // Handle long words
            }}
          >
            {textareaContent} {/* Render the content of the textarea */}
          </div>
        </div>
      </div>

      <footer className='h-48 w-full flex'>
        <button
          onClick={takeScreenshot}
          className='w-fit h-fit text-white mx-auto py-2.5 px-6 rounded-3xl flex items-center justify-center text-sm bg-gray-950 font-sans font-medium'>
          Download
        </button>
      </footer>
    </div>
  )
}

export default App
