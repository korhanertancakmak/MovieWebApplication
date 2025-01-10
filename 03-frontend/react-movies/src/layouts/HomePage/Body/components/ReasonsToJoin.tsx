import './ReasonsToJoin.css';
import { ReactComponent as HandStarCore } from '../../../../Images/handstarcore.svg';
import { ReactComponent as HandShakeCore } from '../../../../Images/handshakecore.svg';
import { ReactComponent as HearthCore } from '../../../../Images/heartcore.svg';
import { ReactComponent as TvMobileCore } from '../../../../Images/tvmobilecore.svg';

export const ReasonsToJoin = () => {
    return(
        <div className="reasonsToJoin-container">
            <div className="reasonsToJoin-title-wrapper">
                <h2 className="reasonsToJoin-title">More Reasons to Join</h2>
            </div>
            <div className="reasonsToJoin-content-container">
                <div className="reasonsToJoin-content-wrapper">
                    <div className='reasonsToJoin-item-container'>
                        <div className='reasonsToJoin-item-wrapper'>
                            <div className='reasonsToJoin-item-title'>
                                <p>Stories tailored to your taste</p>
                            </div>
                            <div className='reasonsToJoin-item-logo-container'>
                                <div className='reasonsToJoin-item-logo-wrapper'>
                                    <HandStarCore />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reasonsToJoin-item-container'>  
                        <div className='reasonsToJoin-item-wrapper'>
                            <div className='reasonsToJoin-item-title'>
                                <p>Without any plans anytime</p>
                            </div>
                            <div className='reasonsToJoin-item-logo-container'>
                                <div className='reasonsToJoin-item-logo-wrapper'>
                                    <HandShakeCore />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reasonsToJoin-item-container'>  
                        <div className='reasonsToJoin-item-wrapper'>
                            <div className='reasonsToJoin-item-title'>
                                <p>A place just for kids</p>
                            </div>
                            <div className='reasonsToJoin-item-logo-container'>
                                <div className='reasonsToJoin-item-logo-wrapper'>
                                    <HearthCore />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reasonsToJoin-item-container'>  
                        <div className='reasonsToJoin-item-wrapper'>
                            <div className='reasonsToJoin-item-title'>
                                <p>For your phone, tablet, laptop and TV</p>
                            </div>
                            <div className='reasonsToJoin-item-logo-container'>
                                <div className='reasonsToJoin-item-logo-wrapper'>
                                    <TvMobileCore />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};