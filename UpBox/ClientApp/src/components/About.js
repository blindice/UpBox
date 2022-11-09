import React, { useEffect } from 'react'
import { Carousel, Image } from 'antd'

const contentStyle = {
  margin: 0,
  height: '100vh',
  color: '#fff',
  background: 'transparent',
}

export default function About({ toggleIcon }) {
  useEffect(() => {
    toggleIcon(false)
  })

  return (
    <Carousel
      dotPosition={'left'}
      style={{
        height: '90vh',
        width: '90vw',
        position: 'relative',
        top: '50px',
      }}
    >
      <div>
        <div style={contentStyle}>
          <span>
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. The writer can use
            the paragraph as the first one of a short story and build upon it. A
            second option is to use the random paragraph somewhere in a short
            story they create. The third option is to have the random paragraph
            be the ending paragraph in a short story. No matter which of these
            challenges is undertaken, the writer is forced to use creativity to
            incorporate the paragraph into their writing.
          </span>
          <img
            alt="asddd"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <p>
            A random paragraph can also be an excellent way for a writer to
            tackle writers' block. Writing block can often happen due to being
            stuck with a current project that the writer is trying to complete.
            By inserting a completely random paragraph from which to begin, it
            can take down some of the issues that may have been causing the
            writers' block in the first place.
          </p>
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <p>
            Another productive way to use this tool to begin a daily writing
            routine. One way is to generate a random paragraph with the
            intention to try to rewrite it while still keeping the original
            meaning. The purpose here is to just get the writing started so that
            when the writer goes onto their day's writing projects, words are
            already flowing from their fingers.
          </p>
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <p>
            Another writing challenge can be to take the individual sentences in
            the random paragraph and incorporate a single sentence from that
            into a new paragraph to create a short story. Unlike the random
            sentence generator, the sentences from the random paragraph will
            have some connection to one another so it will be a bit different.
            You also won't know exactly how many sentences will appear in the
            random paragraph.
          </p>
        </div>
      </div>
    </Carousel>
  )
}
