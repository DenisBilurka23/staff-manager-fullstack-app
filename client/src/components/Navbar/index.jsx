import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Container, IconButton, Menu, MenuItem, styled, Toolbar, Tooltip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../../store/reducers/actionCreators'

const LinkStyled = styled(Link, { shouldForwardProp: prop => prop !== 'mobile' })(({ mobile }) => ({
	display: 'block',
	textDecoration: 'none',
	color: mobile ? '#FFF' : '#000',
	margin: '0.25rem'
}))

const ResponsiveAppBar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.auth.user)
	const pages = user
		? {
				labels: ['Users', 'Employees', 'Departments'],
				links: ['/', 'Employees', 'Departments']
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		: {
				labels: ['Sign In', 'Sign Up'],
				links: ['sign-in', 'sign-up']
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
	const settings = ['Profile', 'Logout']
	const [anchorElNav, setAnchorElNav] = React.useState(null)
	const [anchorElUser, setAnchorElUser] = React.useState(null)

	const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget)

	const handleOpenUserMenu = event => setAnchorElUser(event.currentTarget)

	const handleCloseNavMenu = () => setAnchorElNav(null)

	const handleCloseUserMenu = async setting => {
		setAnchorElUser(null)
		if (setting === 'Logout') {
			const res = await dispatch(logout())
			if (!('error' in res)) {
				navigate('/sign-in')
			}
		}
		if (setting === 'Profile') {
			navigate('/profile')
		}
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						Staff Manager
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}
						>
							{pages.links.map((page, inx) => (
								<MenuItem key={page} display="block" sx={{ display: 'block' }}>
									<LinkStyled to={page} key={page} onClick={handleCloseNavMenu}>
										{pages.labels[inx]}
									</LinkStyled>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						Staff Manager
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.links.map((page, inx) => (
							<LinkStyled mobile to={page} key={page} onClick={handleCloseNavMenu}>
								{pages.labels[inx]}
							</LinkStyled>
						))}
					</Box>
					{user && (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ width: '3rem', height: '3rem', color: '#FFF' }}>
									{user.email[0].toUpperCase()}
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings?.map(setting => (
									<MenuItem key={setting} id={setting} onClick={() => handleCloseUserMenu(setting)}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default ResponsiveAppBar
