import React from 'react'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

export default function BasicTooltip({ onClick }) {
  return (
    <Tooltip title='Delete Blog'>
      <IconButton onClick={onClick}>
        <DeleteIcon color='warning' />
      </IconButton>
    </Tooltip>
  )
}
