import React from 'react'
const PageNotFound = function() {
    return (
        <div style={{ position: 'absolute', top: 50, width: '100%' }}>
            <div className="sub-title">404 - Page Not Found</div>
            <div className="sub-title-2">The page you are looking for doesn't exit or an error occured</div>
            <div style={{ textAlign: 'center' }}><img src={require('./404.gif')} alt="" className = 'spe'/></div>
        </div>
    )
}

export default PageNotFound