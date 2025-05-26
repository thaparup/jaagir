'use client'
import React from 'react'

type Props = {}

const page = (props: Props) => {

    const htmlString = `<p><strong>Bold</strong></p> `;
    const parser = new DOMParser();
    const parsedData = parser.parseFromString(htmlString, 'text/html');
    console.log(typeof parsedData.body.firstChild)
    const node = parsedData.body.firstChild
    if (node) {
        console.log(node.nodeType)
    }
    return (
        <div>page</div>
    )
}

export default page