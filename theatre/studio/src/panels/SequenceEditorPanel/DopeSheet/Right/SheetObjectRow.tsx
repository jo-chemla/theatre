import type {SequenceEditorPanelLayout} from '@theatre/studio/panels/SequenceEditorPanel/layout/layout'
import type {SequenceEditorTree_SheetObject} from '@theatre/studio/panels/SequenceEditorPanel/layout/tree'
import {usePrism} from '@theatre/react'
import type {Pointer} from '@theatre/dataverse'
import React from 'react'
import {decideRowByPropType} from './PropWithChildrenRow'
import RightRow from './Row'

const RightSheetObjectRow: React.VFC<{
  leaf: SequenceEditorTree_SheetObject
  layoutP: Pointer<SequenceEditorPanelLayout>
}> = ({leaf, layoutP}) => {
  return usePrism(() => {
    const node = <div />
    return (
      <RightRow leaf={leaf} node={node} isCollapsed={leaf.isCollapsed}>
        {leaf.children.map((leaf) => decideRowByPropType(leaf, layoutP))}
      </RightRow>
    )
  }, [leaf, layoutP])
}

export default RightSheetObjectRow
