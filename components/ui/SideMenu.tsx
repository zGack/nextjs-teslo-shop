import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { UiContext } from "@/context/ui"
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "@/context/auth"

export const SideMenu = () => {

    const router = useRouter()
    const { isSideMenuOpen, toggleSideMenu } = useContext(UiContext);
    const { isLoggedIn, user, logoutUser } = useContext(AuthContext); 

    const [searchTerm, setSearchTerm] = useState('')

    const onSearchTerm = () => {
        if ( searchTerm.trim().length === 0) return;

        navigateTo(`/search/${ searchTerm }`)
    }

    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }

    const onLogout = () => {
        toggleSideMenu();
        logoutUser();
    }

  return (
    <Drawer
        open={ isSideMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={toggleSideMenu}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>
                <ListItem>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm(e.target.value)}
                        onKeyUp={ ({key}) => key === 'Enter' && onSearchTerm()}
                        type='text'
                        placeholder="Search..."
                        tabIndex={0}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={onSearchTerm}
                                >
                                    <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {
                    isLoggedIn &&
                    <>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Profile'} />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'My orders'} />
                        </ListItemButton>
                    </>

                }

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/men')}
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Men'} />
                </ListItemButton>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/women')}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Women'} />
                </ListItemButton>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/kids')}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Kids'} />
                </ListItemButton>


                {
                    !isLoggedIn ? 

                    <ListItemButton
                        onClick={() => navigateTo(`/auth/login?p=${ router.asPath }`)}
                    >
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Log In'} />
                    </ListItemButton>

                    :

                    <ListItemButton
                        onClick={() => onLogout()}
                    >
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Exit'} />
                    </ListItemButton>
                }


                {/* Admin */}
                {
                    isLoggedIn && user?.role === 'admin' &&
                    <>
                        <Divider />
                        <ListSubheader>Admin Panel</ListSubheader>

                        <ListItemButton>
                            <ListItemIcon>
                                <CategoryOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Products'} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Orders'} />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon>
                                <AdminPanelSettings/>
                            </ListItemIcon>
                            <ListItemText primary={'Users'} />
                        </ListItemButton>
                    </>
                }
                
            </List>
        </Box>
    </Drawer>
  )
}
