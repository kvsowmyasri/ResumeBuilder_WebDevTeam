import React from 'react';
import ScriptTag from 'react-script-tag';
const ChatBot = () => {
    return(
    <div>
        <ScriptTag src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></ScriptTag>
        <df-messenger
        chat-icon="https:&#x2F;&#x2F;nz.hudson.com&#x2F;wp-content&#x2F;cache&#x2F;bb-plugin&#x2F;cache&#x2F;resume-examples-1024x731-landscape.png"
        intent="WELCOME"
        chat-title="ResumeBuilder"
        agent-id="504905e1-9fa5-44fc-a043-b2146f1b0b1c"
        language-code="en"
        ></df-messenger>
    </div>
    )
}
export default ChatBot;