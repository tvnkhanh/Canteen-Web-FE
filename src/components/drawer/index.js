import { styled } from '@mui/material/styles';
import { Divider, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { useUIContext } from '~/context/ui';
import { DrawerCloseButton } from '~/styles/appbar';
import CloseIcon from '@mui/icons-material/Close';
import { Colors } from '~/styles/theme';
import { lighten } from 'polished';

const MiddleDivider = styled((props) => <Divider variant="middle" {...props} />)``;

export default function AppDrawer() {
    const { drawerOpen, setDrawerOpen } = useUIContext();

    return (
        <>
            {drawerOpen && (
                <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
                    <CloseIcon
                        sx={{
                            fontSize: '2.5rem',
                            color: lighten(0.09, Colors.secondary),
                        }}
                    />
                </DrawerCloseButton>
            )}

            <Drawer open={drawerOpen}>
                <List>
                    <ListItemButton>
                        <ListItemText>Home</ListItemText>
                    </ListItemButton>

                    <MiddleDivider />

                    <ListItemButton>
                        <ListItemText>Categories</ListItemText>
                    </ListItemButton>

                    <MiddleDivider />

                    <ListItemButton>
                        <ListItemText>Products</ListItemText>
                    </ListItemButton>

                    <MiddleDivider />

                    <ListItemButton>
                        <ListItemText>Contact Us</ListItemText>
                    </ListItemButton>

                    <MiddleDivider />
                </List>
            </Drawer>
        </>
    );
}
