import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Tile } from 'carbon-components-react';
import AudioWave from '../AudioWave';
import TranscriptBox from '../TranscriptBox';
import ResultBox from '../ResultBox';

export const OutputContainer = ({
  audioAnalyzer,
  audioDataArray,
  audioDuration,
  audioSource,
  audioWaveContainerRef,
  isTranscribing,
  keywordInfo,
  transcriptArray,
  resultArray,
}) => (
  <Tile className="output-container">
    <h3 className="container-title">Output!</h3>
    <FormGroup legendText="Audio">
      <AudioWave
        audioWaveContainerRef={audioWaveContainerRef}
        data={audioDataArray}
        duration={audioDuration}
        isTranscribing={isTranscribing}
        audioSource={audioSource}
        audioAnalyzer={audioAnalyzer}
      />
    </FormGroup>
    <FormGroup legendText="Transcript">
      <TranscriptBox
        keywordInfo={keywordInfo}
        transcriptArray={transcriptArray}
      />
    </FormGroup>
    <FormGroup legendText="Result">
      <ResultBox
        keywordInfo={keywordInfo}
        resultArray={resultArray}
      />
    </FormGroup>
  </Tile>
);

OutputContainer.propTypes = {
  audioAnalyzer: PropTypes.object.isRequired,
  audioDataArray: PropTypes.arrayOf(PropTypes.number),
  audioDuration: PropTypes.number,
  audioSource: PropTypes.string,
  audioWaveContainerRef: PropTypes.object.isRequired,
  isTranscribing: PropTypes.bool,
  keywordInfo: PropTypes.arrayOf(PropTypes.object),
  transcriptArray: PropTypes.arrayOf(PropTypes.object),
  resultArray: PropTypes.arrayOf(PropTypes.object),
};

OutputContainer.defaultProps = {
  audioDataArray: [],
  audioDuration: 0,
  audioSource: '',
  isTranscribing: false,
  keywordInfo: [],
  transcriptArray: [],
  resultArray: [],
};

export default OutputContainer;
