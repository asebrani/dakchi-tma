import time
import threading
import logging

logger = logging.getLogger(__name__)

RATE_LIMIT_REQUEST = 10
RATE_LIMIT_WINDOW = 60

req_histoy = {}
lock = threading.Lock()

def get_client_ip(request):
	x_forwarder_for = request.META.get('HTTP_X_FORWARDED_FOR')
	if x_forwarder_for:
		return x_forwarder_for
	return request.META.get('REMOTE_ADDR', 'unknown')


