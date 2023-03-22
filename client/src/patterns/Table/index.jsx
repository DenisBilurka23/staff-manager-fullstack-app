import {
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer as MuiTableContainer,
	TableHead,
	TableRow,
	Paper,
	styled,
	Checkbox
} from '@mui/material'
import ModifyTable from '../ModifyTable'

const TableContainer = styled(MuiTableContainer)(({ styles }) => ({
	...styles
}))

const Table = ({ selected, setSelected, titles, data, styles, selectable = true, onEdit, onAdd, onDelete }) => {
	const handleClick = (event, name) => {
		if (!selectable) {
			return
		}
		setSelected(prev => (prev === name ? null : name))
	}

	return (
		<TableContainer m="10rem" component={Paper} styles={styles}>
			<MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{selectable && <TableCell align="center">Select</TableCell>}
						{titles?.map(title => (
							<TableCell align="center" key={title + Math.random()}>
								{title}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.map(dataCell => {
						const isItemSelected = selected === dataCell.id
						return (
							<TableRow
								hover={selectable}
								key={Object.values(dataCell)[0] + Math.random()}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								selected={selectable && isItemSelected}
								onClick={event => handleClick(event, dataCell[`id`])}
							>
								{selectable && (
									<TableCell padding="checkbox">
										<Checkbox color="primary" checked={isItemSelected} />
									</TableCell>
								)}
								{Object.values(dataCell).map(cellValue => {
									let value = cellValue
									if (Array.isArray(cellValue)) {
										value = cellValue.length
									}
									if (typeof cellValue === 'boolean') {
										value = cellValue ? '+' : '-'
									}
									return (
										<TableCell key={cellValue + Math.random()} component="th" scope="row" align="center">
											{value}
										</TableCell>
									)
								})}
							</TableRow>
						)
					})}
				</TableBody>
			</MuiTable>
			{selectable && <ModifyTable selected={selected} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />}
		</TableContainer>
	)
}

export default Table
