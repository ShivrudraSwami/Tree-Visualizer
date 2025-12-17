import React, { memo } from 'react';

const TreeNode = memo(({ id, isActive, isVisited, childrenRender }) => {
    const style = {
        width: '36px', height: '36px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2px solid #333', margin: '0 4px', fontSize: '12px', fontWeight: 'bold',
        transition: 'all 0.3s ease',
        backgroundColor: isActive ? '#ff4757' : (isVisited ? '#2ed573' : '#fff'),
        color: (isActive || isVisited) ? '#fff' : '#333',
        transform: isActive ? 'scale(1.2)' : 'scale(1)',
        boxShadow: isActive ? '0 0 10px #ff4757' : 'none'
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={style}>{id}</div>
            {childrenRender && childrenRender.length > 0 && (
                <div style={{ display: 'flex', marginTop: '20px', gap: '10px' }}>
                    {childrenRender}
                </div>
            )}
        </div>
    );
});
export default TreeNode;