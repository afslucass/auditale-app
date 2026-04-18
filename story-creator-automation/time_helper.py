import subprocess

def time_to_millis(time_str):
    """
    Convert time string in format "HH:MM:SS:MMM" to milliseconds.
    
    Args:
        time_str (str): Time in format "hours:minutes:seconds:milliseconds" (e.g., "01:02:30:500")
    
    Returns:
        int: Total milliseconds
    """
    try:
        # Split the time string
        parts = time_str.split(':')
        
        if len(parts) != 4:
            raise ValueError("Time must be in format HH:MM:SS:MMM")
        
        hours = int(parts[0])
        minutes = int(parts[1])
        seconds = int(parts[2])
        milliseconds = int(parts[3])
        
        # Validate ranges
        if minutes >= 60:
            raise ValueError("Minutes must be less than 60")
        if seconds >= 60:
            raise ValueError("Seconds must be less than 60")
        if milliseconds >= 1000:
            raise ValueError("Milliseconds must be less than 1000")
        
        # Calculate total milliseconds
        total_millis = (hours * 60 * 60 * 1000) + \
                       (minutes * 60 * 1000) + \
                       (seconds * 1000) + \
                       milliseconds
        
        return total_millis
        
    except ValueError as e:
        raise ValueError(f"Invalid time format: {e}")
    except Exception as e:
        raise ValueError(f"Error converting time: {e}")


def millis_to_time(milliseconds):
    """
    Convert milliseconds to time string in format "HH:MM:SS:MMM".
    
    Args:
        milliseconds (int): Total milliseconds
    
    Returns:
        str: Time in format "HH:MM:SS:MMM" (e.g., "01:02:30:500")
    """
    try:
        # Ensure milliseconds is positive
        milliseconds = abs(int(milliseconds))
        
        # Calculate hours, minutes, seconds, and remaining milliseconds
        hours = milliseconds // (60 * 60 * 1000)
        remaining_after_hours = milliseconds % (60 * 60 * 1000)
        
        minutes = remaining_after_hours // (60 * 1000)
        remaining_after_minutes = remaining_after_hours % (60 * 1000)
        
        seconds = remaining_after_minutes // 1000
        millis = remaining_after_minutes % 1000
        
        # Format with leading zeros
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}:{millis:03d}"
        
    except Exception as e:
        raise ValueError(f"Error converting milliseconds: {e}")

def get_audio_duration_ms(file_path):
    """
    Get the duration of an audio file in milliseconds using ffprobe.
    
    Args:
        file_path (str): Path to the audio file
    
    Returns:
        int: Duration in milliseconds
    """
    try:
        result = subprocess.run([
            'ffprobe', '-v', 'error', '-show_entries',
            'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1',
            file_path
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        duration_sec = float(result.stdout.strip())
        return int(duration_sec * 1000)
    except Exception as e:
        print(f"Error getting duration for {file_path}: {e}")
        return 0