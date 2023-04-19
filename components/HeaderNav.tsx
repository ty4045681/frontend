import {AuthenticationProps, getServerSideAuthProps} from "@/services/auth";
import {GetServerSideProps} from "next";
import React from "react";
import Link from "next/link";
import {Logout, Mail, Settings} from "@mui/icons-material";
import {Badge, Button, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {useRouter} from "next/router";
import {type} from "os";

export const HeaderNav: React.FC<AuthenticationProps> = ({isAuthenticated, userData}) => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <nav>
            <ul className="flex items-center space-x-4">
                {isAuthenticated
                    ? (
                        <ul className="flex items-center space-x-4">
                            <li>
                                <Button
                                    id="account-button"
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    {userData?.username}
                                </Button>
                                <Menu
                                    id={"account-menu"}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'account-button',
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        handleClose()
                                        router.push('/user')
                                    }}>
                                        <ListItemIcon>
                                            <Settings fontSize="small"/>
                                        </ListItemIcon>
                                        Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        handleClose()
                                        router.push('/user')
                                    }}>
                                        <ListItemIcon>
                                            <Logout fontSize="small"/>
                                        </ListItemIcon>
                                        Logout</MenuItem>
                                </Menu>
                            </li>
                        </ul>
                    ) : (
                        <ul className="flex items-center space-x-4">
                            <li>
                                <Link href="/RegisterPage">
                                    <span className="cursor-pointer hover:text-gray-300">Sign up</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/login">
                                    <span className="cursor-pointer hover:text-gray-300">Log in</span>
                                </Link>
                            </li>
                        </ul>
                    )}
            </ul>
        </nav>
    )
}
