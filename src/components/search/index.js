import { IconButton, Slide } from '@mui/material';
import { useUIContext } from '~/context/ui';
import { SearchBoxContainer, SearchField } from '~/styles/search';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let searchValue;

export default function SearchBox() {
    const { showSearchBox, setShowSearchBox } = useUIContext();
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    return (
        <Slide direction="down" in={showSearchBox} timeout={500}>
            <SearchBoxContainer>
                <SearchField
                    color="secondary"
                    variant="standard"
                    fullWidth
                    placeholder="Search something"
                    onChange={(e) => setValue(e.target.value)}
                />
                <IconButton>
                    <SearchIcon
                        sx={{
                            fontSize: { xs: '2rem', md: '3rem' },
                        }}
                        color="secondary"
                    />
                </IconButton>
                <IconButton
                    onClick={() => {
                        setShowSearchBox(false);
                        if (value !== '') {
                            searchValue = value;
                            navigate('/search');
                        }
                    }}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }}
                >
                    <CloseIcon
                        sx={{
                            fontSize: '4rem',
                        }}
                        color="secondary"
                    />
                </IconButton>
            </SearchBoxContainer>
        </Slide>
    );
}

export { searchValue };
