def time_to_millis(time_str):
    """
    Convert time string in format "MM:SS:MMM" to milliseconds.
    
    Args:
        time_str (str): Time in format "minutes:seconds:milliseconds" (e.g., "02:30:500")
    
    Returns:
        int: Total milliseconds
    """
    try:
        # Split the time string
        parts = time_str.split(':')
        
        if len(parts) != 3:
            raise ValueError("Time must be in format MM:SS:MMM")
        
        minutes = int(parts[0])
        seconds = int(parts[1])
        milliseconds = int(parts[2])
        
        # Validate ranges
        if seconds >= 60:
            raise ValueError("Seconds must be less than 60")
        if milliseconds >= 1000:
            raise ValueError("Milliseconds must be less than 1000")
        
        # Calculate total milliseconds
        total_millis = (minutes * 60 * 1000) + (seconds * 1000) + milliseconds
        
        return total_millis
        
    except ValueError as e:
        raise ValueError(f"Invalid time format: {e}")
    except Exception as e:
        raise ValueError(f"Error converting time: {e}")


def millis_to_time(milliseconds):
    """
    Convert milliseconds to time string in format "MM:SS:MMM".
    
    Args:
        milliseconds (int): Total milliseconds
    
    Returns:
        str: Time in format "MM:SS:MMM" (e.g., "02:30:500")
    """
    try:
        # Ensure milliseconds is positive
        milliseconds = abs(int(milliseconds))
        
        # Calculate minutes, seconds, and remaining milliseconds
        minutes = milliseconds // (60 * 1000)
        remaining = milliseconds % (60 * 1000)
        
        seconds = remaining // 1000
        millis = remaining % 1000
        
        # Format with leading zeros
        return f"{minutes:02d}:{seconds:02d}:{millis:03d}"
        
    except Exception as e:
        raise ValueError(f"Error converting milliseconds: {e}")