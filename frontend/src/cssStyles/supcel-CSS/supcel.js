
// To use a celesup <textarea> element you this function must be called 

function customTextarea() {
    const textA = document.querySelectorAll('textarea') || null;

    if (textA) return
    
    textA.forEach(textarea => {
        textarea.setAttribute('rows', '1')
        textarea.style.cssText = `
        height: ${textarea.scrollHeight}px;
        overflow-y :hidden
        `
        textarea.addEventListener('input',({target})=>{
            target.style.height = 'auto'
            target.style.height = `${target.scrollHeight}px`
        });
    })
}


document.addEventListener('DOMContentLoaded',customTextarea)