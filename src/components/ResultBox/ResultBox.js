import React from 'react';
import PropTypes from 'prop-types';
// import { TooltipDefinition } from 'carbon-components-react';
// import KeywordTooltip from '../KeywordTooltip';
import { createWordRegex } from './utils';

const mapResultTextToElements = (text, keywordInfo, totalIndex) => {
  let finalSentenceArray = [];
  let matches = [];

  if (keywordInfo.length > 0) {
    const regex = createWordRegex(keywordInfo);
    matches = text.split(regex);
  }

  // If we don't have words to find yet, just return the interim text.
  if (matches.length === 0) {
    return [
      {
        text,
        type: 'normal',
      },
    ];
  }

  const wordOccurences = {};
  finalSentenceArray = matches.map((sentenceFragment, index) => {
    // Use lowercased version when searching through keyword map.
    const fragmentToSearch = sentenceFragment.toLowerCase();

    if (index % 2 === 0) {
      return {
        text: sentenceFragment,
        type: 'normal',
        index: index,
      };
    }

    // Find keyword info object to use based on text from sentenceFragment and
    // current index in wordOccurences.
    const keywordInfoMatch =
      keywordInfo[totalIndex] && keywordInfo[totalIndex][fragmentToSearch];
    let keywordOccurenceIndex = 0;
    if (wordOccurences[fragmentToSearch]) {
      keywordOccurenceIndex = wordOccurences[fragmentToSearch];
      wordOccurences[fragmentToSearch] += 1;
    } else {
      wordOccurences[fragmentToSearch] = 1;
    }
    const infoForOccurence =
      keywordInfoMatch && keywordInfoMatch[keywordOccurenceIndex];

    // Bail in case we can't get the keyword info for whatever reason.
    if (!infoForOccurence) {
      return {};
    }

    return {
      text: sentenceFragment,
      type: 'keyword',
      startTime: infoForOccurence.start_time,
      endTime: infoForOccurence.end_time,
      confidence: infoForOccurence.confidence,
      index: index,
    };
  });

  return finalSentenceArray;
};

export const  ResultBox = ({ keywordInfo, resultArray }) => {
  return (
    <div className="result-box">
      {resultArray.map((resultItem, overallIndex) => {
        const { speaker, text } = resultItem;
        const parsedTextElements = mapResultTextToElements(
          text,
          keywordInfo,
          overallIndex,
        );

        return (
          <div key={`result-${overallIndex}`}>
            {speaker !== null && (
              <span className={`speaker-label--${speaker}`}>
                {/* {`Speaker_ ${speaker}: `} */}
                {}
              </span>
            )}
            {parsedTextElements.map((element, elementIndex) => {
              if (!element) {
                return null;
              }

              if (element.type === 'normal') {
                return (
                  <span
                    key={`result-text-${overallIndex}-${elementIndex}`}
                    >{}</span>
                  // >{`${element.text},overallIndex:${overallIndex},elementIndex:${elementIndex}, length:${element.text.length}`}</span>
                );
              } else if (element.type === 'keyword') {
                
                let tsr = resultArray[`${overallIndex}`].text.split(`${element.text}`)
                let before = tsr[0].substr(tsr[0].length-5,5)
                let beforeindex = tsr[0].length
                let after = tsr[1].substr(0,5)
                
                return (
                  <p>
                  <span
                  key={`result-keyword-${overallIndex}-${elementIndex}`}
                    // >{`:`}</span>
                  >{`検索ワード：「${element.text}」,行:${overallIndex+1},
                  位置:${beforeindex+1},
                  前５字:「${before}」,後５字:「${after}」
                  `}</span></p>
                );
              }

              return null;
            })}
          </div>
        );
      })}
    </div>
  );
};

ResultBox.propTypes = {
  keywordInfo: PropTypes.arrayOf(PropTypes.object),
  resultArray: PropTypes.arrayOf(PropTypes.object),
};

ResultBox.defaultProps = {
  keywordInfo: [],
  resultArray: [],
};

export default ResultBox;
